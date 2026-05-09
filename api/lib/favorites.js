import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "favorites.json");

export const loadFavorites = () => fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf-8")) : [];
export const saveFavorites = (list) => fs.writeFileSync(FILE, JSON.stringify(list, null, 2));