import { useFavorites } from "../hooks/useFavorites.js";
import ServiceCard      from "../components/ServiceCard.jsx";
import styles           from "./Favorites.module.css";

export default function Favorites() {
  const { favorites, setFavorites, loading, refetch } = useFavorites();

  function handleFavoriteToggle(unit, isFav) {
    if (!isFav) {
      // Retiré des favoris → on le supprime de la liste
      setFavorites(prev => prev.filter(s => s.name !== unit));
    }
    // isFav === true ne peut pas arriver ici (déjà en favoris)
  }

  return (
    <div className={styles.page}>
      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skeleton} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className={styles.skeletonLine} style={{ width: '55%' }} />
              <div className={styles.skeletonLine} style={{ width: '80%', height: '10px', marginTop: '6px' }} />
              <div className={styles.skeletonBadge} />
              <div className={styles.skeletonActions}>
                <div className={styles.skeletonBtn} />
                <div className={styles.skeletonBtn} style={{ width: '60px' }} />
              </div>
            </div>
          ))}
        </div>
      ) : !favorites.length ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>⭐</span>
          <p>Aucun favori ajouté.</p>
          <span className={styles.emptyHint}>Clique sur l'étoile d'un service pour l'ajouter ici.</span>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((s, i) => (
            <div
              key={s.name}
              style={{ animation: 'fadeInUp 0.4s ease both', animationDelay: `${i * 0.05}s` }}
            >
              <ServiceCard
                service={{ ...s, unit: s.name, favorite: true }}  // ← force true
                onRefetch={refetch}
                onFavoriteToggle={handleFavoriteToggle}            // ← optimistic
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}