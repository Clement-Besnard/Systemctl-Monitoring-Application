import { useNavigate }  from "react-router-dom";
import Badge            from "./ui/Badge.jsx";
import Button           from "./ui/Button.jsx";
import Card             from "./ui/Card.jsx";
import { serviceAction } from "../api/services.api.js";
import { addFavorite, removeFavorite } from "../api/favorites.api.js";
import styles           from "./ServiceCard.module.css";

export default function ServiceCard({ service, onRefetch }) {
  const navigate = useNavigate();

  async function handleAction(action) {
    await serviceAction(service.unit, action);
    onRefetch?.();
  }

  async function toggleFavorite() {
    service.favorite ? await removeFavorite(service.unit) : await addFavorite(service.unit);
    onRefetch?.();
  }

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.name} onClick={() => navigate(`/services/${service.unit}`)}>
          {service.unit}
        </div>
        <button className={`${styles.star} ${service.favorite ? styles.starred : ""}`} onClick={toggleFavorite}>
          {service.favorite ? "★" : "☆"}
        </button>
      </div>

      <p className={styles.desc}>{service.description || "—"}</p>

      <div className={styles.badges}>
        <Badge label={service.active} />
        <Badge label={service.sub}    />
      </div>

      <div className={styles.actions}>
        <Button size="sm" onClick={() => handleAction("start")}>▶ Start</Button>
        <Button size="sm" onClick={() => handleAction("stop")}>■ Stop</Button>
        <Button size="sm" onClick={() => handleAction("restart")}>↺ Restart</Button>
        <Button size="sm" variant="ghost" onClick={() => navigate(`/services/${service.unit}`)}>Détails →</Button>
      </div>
    </Card>
  );
}