import { useLocation } from "react-router-dom";
import styles          from "./TopBar.module.css";

const TITLES = { "/": "Dashboard", "/services": "Services", "/favorites": "Favoris" };

export default function TopBar() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? "Détail";

  return (
    <header className={styles.topbar}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.right}>
        <span className={styles.chip}>v2.0.0</span>
      </div>
    </header>
  );
}