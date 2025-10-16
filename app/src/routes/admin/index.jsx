import { createFileRoute } from "@tanstack/react-router";
import styles from "../../styles/Admin.module.css";

const dashboardStats = {
  nextTripBookings: 8,
  pendingPayments: 3,
  newUsersThisWeek: 5,
};

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>{dashboardStats.nextTripBookings}</h3>
          <p>Reservaciones para el próximo viaje</p>
        </div>
        <div className={styles.statCard}>
          <h3>{dashboardStats.pendingPayments}</h3>
          <p>Pagos pendientes</p>
        </div>
        <div className={styles.statCard}>
          <h3>{dashboardStats.newUsersThisWeek}</h3>
          <p>Nuevas usuarias esta semana</p>
        </div>
      </div>
    </div>
  );
}
