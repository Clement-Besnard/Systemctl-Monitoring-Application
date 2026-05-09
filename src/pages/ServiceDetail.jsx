import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState }    from "react";
import { getService, getServiceStatus, serviceAction } from "../api/services.api.js";
import { addFavorite, removeFavorite }                 from "../api/favorites.api.js";
import Card       from "../components/ui/Card.jsx";
import Badge      from "../components/ui/Badge.jsx";
import Button     from "../components/ui/Button.jsx";
import LogsViewer from "../components/LogsViewer.jsx";
import styles     from "./ServiceDetail.module.css";

export default function ServiceDetail() {
  const { name }   = useParams();
  const navigate   = useNavigate();
  const [info,     setInfo]    = useState(null);
  const [status,   setStatus]  = useState("");
  const [actLoading, setActLoading] = useState(null);

  async function load() {
    const [svc, st] = await Promise.all([getService(name), getServiceStatus(name)]);
    setInfo(svc.info);
    setStatus(st.status);
  }

  useEffect(() => { load(); }, [name]);

  async function handleAction(action) {
    setActLoading(action);
    await serviceAction(name, action);
    await load();
    setActLoading(null);
  }

  async function toggleFavorite() {
    info.favorite ? await removeFavorite(name) : await addFavorite(name);
    await load();
  }

  if (!info) return <div className={styles.loading}>Chargement...</div>;

  const FIELDS = [
    ["Description", info.description],
    ["Load State",  info.load_state],
    ["Enabled",     info.enabled],
    ["PID",         info.pid || "—"],
    ["Unit File",   info.fragment || "—"],
  ];

  return (
    <div className={styles.page}>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>← Retour</Button>

      <div className={styles.header}>
        <div>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.badges}>
            <Badge label={info.active} />
            <Badge label={info.sub}    />
          </div>
        </div>
        <button className={`${styles.star} ${info.favorite ? styles.starred : ""}`} onClick={toggleFavorite}>
          {info.favorite ? "★" : "☆"}
        </button>
      </div>

      <div className={styles.grid}>
        <Card>
          <h3 className={styles.sectionTitle}>Informations</h3>
          <dl className={styles.dl}>
            {FIELDS.map(([k, v]) => (
              <div key={k} className={styles.row}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card>
          <h3 className={styles.sectionTitle}>Actions</h3>
          <div className={styles.actions}>
            {["start","stop","restart","reload","enable","disable"].map(act => (
              <Button key={act} onClick={() => handleAction(act)}
                loading={actLoading === act}
                variant={act === "stop" || act === "disable" ? "danger" : "default"}>
                {act}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className={styles.sectionTitle}>Status brut</h3>
        <pre className={styles.status}>{status}</pre>
      </Card>

      <Card>
        <h3 className={styles.sectionTitle}>Logs</h3>
        <LogsViewer name={name} />
      </Card>
    </div>
  );
}