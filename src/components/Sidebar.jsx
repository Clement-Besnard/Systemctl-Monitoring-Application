import { NavLink }  from "react-router-dom";
import styles       from "./Sidebar.module.css";

const NAV = [
  { to: "/",          icon: "⬡", label: "Dashboard"  },
  { to: "/services",  icon: "◈", label: "Services"   },
  { to: "/favorites", icon: "◆", label: "Favoris"    },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⬡</span>
        <span className={styles.logoText}>systemctl<b>UI</b></span>
      </div>
      <nav className={styles.nav}>
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
            <span className={styles.icon}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.footer}>
        <span className={styles.dot} />
        API connectée
      </div>
    </aside>
  );
}