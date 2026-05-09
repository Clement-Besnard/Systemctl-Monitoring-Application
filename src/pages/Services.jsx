import { useState }     from "react";
import { useServices }  from "../hooks/useServices.js";
import ServiceCard      from "../components/ServiceCard.jsx";
import Button           from "../components/ui/Button.jsx";
import styles           from "./Services.module.css";

const FILTERS = [null, "active", "inactive", "failed"];

export default function Services() {
  const [filter, setFilter]   = useState(null);
  const [search, setSearch]   = useState("");
  const { services, loading, refetch } = useServices(filter);

  const visible = services.filter(s =>
    s.unit.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Rechercher un service..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.filters}>
          {FILTERS.map(f => (
            <Button key={f ?? "all"} size="sm"
              variant={filter === f ? "primary" : "default"}
              onClick={() => setFilter(f)}>
              {f ?? "Tous"}
            </Button>
          ))}
        </div>
      </div>

      {loading
        ? <div className={styles.loading}>Chargement...</div>
        : <div className={styles.grid}>
            {visible.map(s => <ServiceCard key={s.unit} service={s} onRefetch={refetch} />)}
          </div>
      }
    </div>
  );
}