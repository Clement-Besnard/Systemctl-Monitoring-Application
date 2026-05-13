import { useState, useEffect, useCallback } from "react";
import { getFavorites, addFavorite, removeFavorite, favoriteAction } from "../api/favorites.api.js";


export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading,   setLoading]   = useState(true);


  const refetch = useCallback(() => {
    getFavorites()
      .then(d => setFavorites(d.favorites ?? []))
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => { refetch(); }, [refetch]);


  const add    = (name) => addFavorite(name).then(refetch);
  const remove = (name) => removeFavorite(name).then(refetch);
  const action = (name, act) => favoriteAction(name, act).then(refetch);


  return { favorites, setFavorites, loading, add, remove, action, refetch }; // ← setFavorites ajouté
}