import { spawnSync } from "child_process";

const VALID_NAME = /^[\w.\-@]+\.service$/;

export const validateServiceName = (name) => VALID_NAME.test(name);

export function runSystemctl(...args) {
  const { stdout = "", stderr = "", status } = spawnSync("systemctl", args, { encoding: "utf-8" });
  return { stdout, stderr, code: status ?? 1 };
}

export function getServiceInfo(name) {
  const { stdout } = runSystemctl("show", name, "--no-pager");
  const props = Object.fromEntries(
    stdout.trim().split("\n")
      .filter(l => l.includes("="))
      .map(l => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)])
  );
  return {
    name,
    description: props.Description  ?? "",
    load_state:  props.LoadState     ?? "",
    active:      props.ActiveState   ?? "",
    sub:         props.SubState      ?? "",
    enabled:     props.UnitFileState ?? "",
    pid:         props.MainPID       ?? "",
    fragment:    props.FragmentPath  ?? "",
  };
}