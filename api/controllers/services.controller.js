import { spawnSync }                         from "child_process";
import { runSystemctl, getServiceInfo }      from "../lib/systemctl.js";
import { loadFavorites }                     from "../lib/favorites.js";

// Helper interne, pas exporté
function systemctlAction(name, action) {
  const { stdout, stderr, code } = runSystemctl(action, name);
  return { service: name, action, success: code === 0, returncode: code, output: (stdout + stderr).trim() };
}

export const listServices = (req, res, next) => {
  try {
    const { state, type = "service" } = req.query;
    const args = ["list-units", `--type=${type}`, "--all", "--plain", "--no-legend"];
    if (state) args.push(`--state=${state}`);

    const { stdout, stderr, code } = runSystemctl(...args);
    if (code !== 0) return res.status(500).json({ error: stderr.trim() });

    const favs = loadFavorites();
    const services = stdout.trim().split("\n")
      .map(l => l.trim().split(/\s+/, 5))
      .filter(p => p.length >= 4)
      .map(([unit, load, active, sub, ...rest]) => ({
        unit, load, active, sub,
        description: rest.join(" ").trim(),
        favorite: favs.includes(unit),
      }));

    res.json({ count: services.length, services });
  } catch (err) { next(err); }
};

export const listFailed = (req, res, next) => {
  try {
    const { stdout, stderr, code } = runSystemctl(
      "list-units", "--type=service", "--state=failed", "--plain", "--no-legend"
    );
    if (code !== 0) return res.status(500).json({ error: stderr.trim() });

    const services = stdout.trim().split("\n")
      .map(l => l.trim().split(/\s+/, 5))
      .filter(p => p.length >= 4)
      .map(([unit, load, active, sub, ...rest]) => ({
        unit, load, active, sub, description: rest.join(" ").trim(),
      }));

    res.json({ count: services.length, failed_services: services });
  } catch (err) { next(err); }
};

export const getService = (req, res, next) => {
  try {
    const info    = getServiceInfo(req.params.name);
    info.favorite = loadFavorites().includes(req.params.name);
    res.json({ service: req.params.name, info });
  } catch (err) { next(err); }
};

export const getServiceStatus = (req, res, next) => {
  try {
    const { stdout, stderr, code } = runSystemctl("status", req.params.name, "--no-pager", "-l");
    res.json({ service: req.params.name, returncode: code, status: stdout.trim() || stderr.trim() });
  } catch (err) { next(err); }
};

export const getServiceLogs = (req, res, next) => {
  try {
    const { name }  = req.params;
    const lines     = Math.min(parseInt(req.query.lines ?? "50"), 1000);
    const cmd       = ["journalctl", "-u", name, "--no-pager", "-n", String(lines), "--output=short-iso"];
    if (req.query.since) cmd.push(`--since=${req.query.since}`);
    if (req.query.until) cmd.push(`--until=${req.query.until}`);

    const { stdout } = spawnSync(cmd[0], cmd.slice(1), { encoding: "utf-8" });
    res.json({ service: name, lines, logs: stdout?.trim() ?? "" });
  } catch (err) { next(err); }
};

// Factory : génère un controller d'action à la volée
export const serviceAction = (action) => (req, res, next) => {
  try {
    const result = systemctlAction(req.params.name, action);
    res.status(result.success ? 200 : 500).json(result);
  } catch (err) { next(err); }
};