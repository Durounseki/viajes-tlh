import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import styles from "../styles/Login.module.css";
import { useAuth } from "../data/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (search) => {
    return {
      redirect: search.redirect ? String(search.redirect) : "/admin",
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { redirect } = Route.useSearch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate(
      { username, password },
      {
        onSuccess: () => {
          navigate({ to: redirect || "/admin" });
        },
      }
    );
  };

  return (
    <main className={styles.content}>
      <h1 className={styles["page-title"]}>Bienvenida</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h3>Inicia sesión para continuar.</h3>
        <div className={styles.formGroup}>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {login.isError && (
          <p className={styles.errorMessage}>{login.error.message}</p>
        )}

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={login.isPending}
        >
          Iniciar Sesión
          {login.isPending ? "Iniciando..." : "Iniciar Sesión"}
        </button>
      </form>
    </main>
  );
}
