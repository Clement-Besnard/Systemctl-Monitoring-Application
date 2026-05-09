import { useFavorites } from "../hooks/useFavorites.js";
import ServiceCard      from "../components/ServiceCard.jsx";
import styles           from "./Favorites.module.css";

export default function Favorites() {
  const { favorites, loading, refetch } = useFavorites();

  if (loading) return <div className={styles.empty}>Chargement...</div>;
  if (!favorites.length) return <div className={styles.empty}>Aucun favori ajouté.</div>;

  return (
    <div className={styles.grid}>
      {favorites.map(s => (
        <ServiceCard key={s.name} service={{ ...s, unit: s.name }} onRefetch={refetch} />
      ))}
    </div>
  );
}