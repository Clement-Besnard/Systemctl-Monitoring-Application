import { runSystemctl, getServiceInfo } from "../lib/systemctl.js";
import { loadFavorites, saveFavorites } from "../lib/favorites.js";

function systemctlAction(name, action) {
  const { stdout, stderr, code } = runSystemctl(action, name);
  return { service: name, action, success: code === 0, returncode: code, output: (stdout + stderr).trim() };
}

function assertInFavorites(name, next) {
  if (!loadFavorites().includes(name)) {
    const err  = new Error(`${name} n'est pas dans les favoris.`);
    err.status = 404;
    next(err);
    return false;
  }
  return true;
}

export const listFavorites = (req, res, next) => {
  try {
    const favs = loadFavorites();
    res.json({ count: favs.length, favorites: favs.map(getServiceInfo) });
  } catch (err) { next(err); }
};

export const addFavorite = (req, res, next) => {
  try {
    const { name } = req.params;
    const favs     = loadFavorites();
    if (favs.includes(name))
      return res.status(200).json({ message: `${name} est déjà en favori.`, favorites: favs });
    favs.push(name);
    saveFavorites(favs);
    res.status(201).json({ message: `${name} ajouté aux favoris.`, favorites: favs });
  } catch (err) { next(err); }
};

export const removeFavorite = (req, res, next) => {
  try {
    const { name } = req.params;
    const favs     = loadFavorites();
    if (!favs.includes(name)) {
      const err = new Error(`${name} n'est pas dans les favoris.`);
      err.status = 404;
      return next(err);
    }
    const updated = favs.filter(f => f !== name);
    saveFavorites(updated);
    res.json({ message: `${name} retiré des favoris.`, favorites: updated });
  } catch (err) { next(err); }
};

export const favoriteStatus = (req, res, next) => {
  try {
    if (!assertInFavorites(req.params.name, next)) return;
    const { stdout, stderr, code } = runSystemctl("status", req.params.name, "--no-pager", "-l");
    res.json({ service: req.params.name, returncode: code, status: stdout.trim() || stderr.trim() });
  } catch (err) { next(err); }
};

export const favoriteAction = (action) => (req, res, next) => {
  try {
    if (!assertInFavorites(req.params.name, next)) return;
    const result = systemctlAction(req.params.name, action);
    res.status(result.success ? 200 : 500).json(result);
  } catch (err) { next(err); }
};