const BASE = "/api/favorites";

export const getFavorites     = ()     => fetch(BASE).then(r => r.json());
export const addFavorite      = (name) => fetch(`${BASE}/${name}`, { method: "POST" }).then(r => r.json());
export const removeFavorite   = (name) => fetch(`${BASE}/${name}`, { method: "DELETE" }).then(r => r.json());
export const favoriteAction   = (name, action) => fetch(`${BASE}/${name}/${action}`, { method: "POST" }).then(r => r.json());