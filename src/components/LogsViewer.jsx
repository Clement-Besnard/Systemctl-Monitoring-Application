import { useState } from "react";
import { getServiceLogs } from "../api/services.api.js";
import Button from "./ui/Button.jsx";
import styles from "./LogsViewer.module.css";

export default function LogsViewer({ name }) {
  const [logs,    setLogs]    = useState("");
  const [lines,   setLines]   = useState(50);
  const [loading, setLoading] = useState(false);

  async function fetchLogs() {
    setLoading(true);
    const data = await getServiceLogs(name, lines);
    setLogs(data.logs ?? "");
    setLoading(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <select className={styles.select} value={lines} onChange={e => setLines(Number(e.target.value))}>
          {[50, 100, 200, 500].map(n => <option key={n} value={n}>{n} lignes</option>)}
        </select>
        <Button onClick={fetchLogs} loading={loading} variant="primary" size="sm">
          Charger les logs
        </Button>
      </div>
      <pre className={styles.pre}>{logs || "Aucun log chargé."}</pre>
    </div>
  );
}