import { Routes, Route } from "react-router-dom";
import Sidebar        from "./components/Sidebar.jsx";
import TopBar         from "./components/TopBar.jsx";
import Dashboard      from "./pages/Dashboard.jsx";
import Services       from "./pages/Services.jsx";
import ServiceDetail  from "./pages/ServiceDetail.jsx";
import Favorites      from "./pages/Favorites.jsx";
import styles         from "./App.module.css";

export default function App() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <TopBar />
        <div className={styles.content}>
          <Routes>
            <Route path="/"               element={<Dashboard />} />
            <Route path="/services"       element={<Services />} />
            <Route path="/services/:name" element={<ServiceDetail />} />
            <Route path="/favorites"      element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}