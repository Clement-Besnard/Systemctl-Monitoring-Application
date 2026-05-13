import { useState }    from "react";
import { useServices } from "../hooks/useServices.js";
import ServiceCard     from "../components/ServiceCard.jsx";
import styles          from "./Services.module.css";

export default function Services() {
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState("");
  const { services, setServices, loading, refetch } = useServices(filter);

  // Met à jour localement sans GET /services
  function handleFavoriteToggle(unit, isFav) {
    setServices(prev =>
      prev.map(s => s.unit === unit ? { ...s, favorite: isFav } : s)
    );
  }

  const visible = services.filter(s =>
    s.unit.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Rechercher un service..."
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === null ? styles.filterActive : ''}`}
            onClick={() => setFilter(null)}
          >
            Tous
          </button>
          <button
            className={`${styles.filterBtn} ${styles.dotActive} ${filter === 'active' ? styles.dotActiveSelected : ''}`}
            onClick={() => setFilter('active')}
          >
            active
          </button>
          <button
            className={`${styles.filterBtn} ${styles.dotInactive} ${filter === 'inactive' ? styles.filterActive : ''}`}
            onClick={() => setFilter('inactive')}
          >
            inactive
          </button>
          <button
            className={`${styles.filterBtn} ${styles.dotFailed} ${filter === 'failed' ? styles.dotFailedSelected : ''}`}
            onClick={() => setFilter('failed')}
          >
            failed
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeleton} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className={styles.skeletonLine} style={{ width: '55%' }} />
                <div className={styles.skeletonLine} style={{ width: '80%', height: '10px', marginTop: '6px' }} />
                <div className={styles.skeletonBadge} />
                <div className={styles.skeletonActions}>
                  <div className={styles.skeletonBtn} />
                  <div className={styles.skeletonBtn} style={{ width: '60px' }} />
                </div>
              </div>
            ))
          : visible.map((service, i) => (
              <div key={service.unit} style={{ animation: `fadeInUp 0.4s ease both`, animationDelay: `${i * 0.05}s` }}>
                <ServiceCard
                  service={service}
                  onRefetch={refetch}
                  onFavoriteToggle={handleFavoriteToggle}  // ← nouveau
                />
              </div>
            ))
        }
      </div>
    </div>
  );
}