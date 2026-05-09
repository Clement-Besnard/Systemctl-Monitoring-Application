import { useFailed }    from "../hooks/useServices.js";
import { useFavorites } from "../hooks/useFavorites.js";
import Card             from "../components/ui/Card.jsx";
import Badge            from "../components/ui/Badge.jsx";
import ServiceCard      from "../components/ServiceCard.jsx";
import styles           from "./Dashboard.module.css";

export default function Dashboard() {
  const { failed }    = useFailed();
  const { favorites, action, refetch } = useFavorites();

  const stats = [
    { label: "Favoris",          value: favorites.length,                           color: "accent" },
    { label: "Favoris actifs",   value: favorites.filter(f => f.active === "active").length, color: "green"  },
    { label: "Services en échec", value: failed.length,                             color: "red"    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.stats}>
        {stats.map(s => (
          <Card key={s.label} className={styles.stat}>
            <span className={`${styles.statValue} ${styles[s.color]}`}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </Card>
        ))}
      </div>

      {failed.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>⚠ Services en échec</h2>
          <div className={styles.grid}>
            {failed.map(s => (
              <Card key={s.unit} className={styles.failedCard}>
                <span className={styles.failedName}>{s.unit}</span>
                <Badge label="failed" />
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className={styles.sectionTitle}>★ Favoris</h2>
        <div className={styles.grid}>
          {favorites.map(s => (
            <ServiceCard key={s.name} service={{ ...s, unit: s.name }} onRefetch={refetch} />
          ))}
        </div>
      </section>
    </div>
  );
}