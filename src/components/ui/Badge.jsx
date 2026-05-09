import styles from "./Badge.module.css";

const STATE_MAP = {
  active:   "green",
  running:  "green",
  inactive: "muted",
  failed:   "red",
  waiting:  "yellow",
  enabled:  "green",
  disabled: "muted",
};

export default function Badge({ label }) {
  const color = STATE_MAP[label?.toLowerCase()] ?? "muted";
  return <span className={`${styles.badge} ${styles[color]}`}>{label}</span>;
}