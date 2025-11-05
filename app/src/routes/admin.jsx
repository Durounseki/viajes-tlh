import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import styles from "../styles/Admin.module.css";
import AdminLink from "../components/AdminLink";
import {
  FaHome,
  FaPlane,
  FaTicketAlt,
  FaUsers,
  FaSignOutAlt,
  FaCog,
  FaStar,
} from "react-icons/fa";
import { useAuth, authQueryOptions } from "../data/auth.js";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;
    try {
      await queryClient.ensureQueryData(authQueryOptions);
    } catch (error) {
      console.error("Error authenticating user", error);
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { logout } = useAuth();
  const handleLogout = () => {
    if (window.confirm("¿Estás segura de que deseas cerrar sesión?")) {
      logout.mutate();
    }
  };
  return (
    <main className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Viajeras por Siempre Admin</h3>
        </div>
        <nav className={styles.desktopNav}>
          <AdminLink to="/admin">
            <FaHome /> Inicio
          </AdminLink>
          <AdminLink to="/admin/viajes">
            <FaPlane /> Viajes
          </AdminLink>
          <AdminLink to="/admin/reservaciones">
            <FaTicketAlt /> Reservaciones
          </AdminLink>
          <AdminLink to="/admin/usuarios">
            <FaUsers /> Usuarios
          </AdminLink>
          <AdminLink to="/admin/reseñas">
            <FaStar /> Reseñas
          </AdminLink>
          <AdminLink to="/admin/ajustes">
            <FaCog /> Ajustes
          </AdminLink>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            <FaSignOutAlt />
            <span>{logout.isPending ? "Saliendo..." : "Cerrar Sesión"}</span>
          </button>
        </nav>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Bienvenida, Teresa</h2>
          <p>¿Qué te gustaría hacer hoy?</p>
        </header>
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>

      <nav className={styles.mobileNav}>
        <AdminLink to="/admin">
          <FaHome /> Inicio
        </AdminLink>
        <AdminLink to="/admin/viajes">
          <FaPlane /> Viajes
        </AdminLink>
        <AdminLink to="/admin/reservaciones">
          <FaTicketAlt /> Reservaciones
        </AdminLink>
        <AdminLink to="/admin/usuarios">
          <FaUsers /> Usuarios
        </AdminLink>
        <AdminLink to="/admin/reseñas">
          <FaStar />
          <span style={{ fontSize: "0.8rem" }}>Reseñas</span>
        </AdminLink>
        <AdminLink to="/admin/ajustes">
          <FaCog />
          <span style={{ fontSize: "0.8rem" }}>Ajustes</span>
        </AdminLink>
        <button
          className={styles.mobileLogoutButton}
          onClick={handleLogout}
          disabled={logout.isPending}
          aria-label="Cerrar Sesión"
        >
          <FaSignOutAlt />
          <span style={{ fontSize: "0.8rem" }}>Salir</span>
        </button>
      </nav>
    </main>
  );
}
