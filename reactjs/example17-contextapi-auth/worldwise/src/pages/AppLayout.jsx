import Map from "../components/Map";
import Sidebar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import ProtectedRoute from "./ProtectedRoute";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
}
