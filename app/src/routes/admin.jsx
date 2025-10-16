import { Outlet, createFileRoute } from "@tanstack/react-router";
import styles from "../styles/Admin.module.css";
import AdminLink from "../components/AdminLink";

const adminUser = { name: "Teresa" };

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Viajeras por Siempre Admin</h3>
        </div>
        <nav className={styles.desktopNav}>
          <AdminLink to="/admin">🏠 Inicio</AdminLink>
          <AdminLink to="/admin/viajes">✈️ Viajes</AdminLink>
          <AdminLink to="/admin/reservaciones">🎟️ Reservaciones</AdminLink>
          <AdminLink to="/admin/usuarios">👥 Usuarios</AdminLink>
        </nav>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Bienvenida, {adminUser.name}</h2>
          <p>¿Qué te gustaría hacer hoy?</p>
        </header>
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>

      <nav className={styles.mobileNav}>
        <AdminLink to="/admin">🏠 Inicio</AdminLink>
        <AdminLink to="/admin/viajes">✈️ Viajes</AdminLink>
        <AdminLink to="/admin/bookings">🎟️ Reservaciones</AdminLink>
        <AdminLink to="/admin/users">👥 Usuarios</AdminLink>
      </nav>
    </main>
  );
}
