import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../styles/Login.module.css";
import { useAuth } from "../data/auth";

export const Route = createFileRoute("/reset-password-confirm")({
  validateSearch: (search) => {
    return {
      token: search.token ? String(search.token) : "",
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { resetPasswordConfirm } = useAuth();
  const { token } = Route.useSearch();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!newPassword || !confirmPassword) {
      setLocalError("Por favor, completa todos los campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden.");
      return;
    }
    if (!token) {
      setLocalError(
        "Parece que el enlace ha expirado. Solicita un nuevo enlace."
      );
      return;
    }
    resetPasswordConfirm.mutate({ token, newPassword });
  };

  if (resetPasswordConfirm.isSuccess) {
    return (
      <main className={styles.content}>
        <div className={styles.loginForm}>
          <div className={styles.resetPasswordMessage}>
            <h3 style={{ textAlign: "center" }}>¡Éxito!</h3>
            <p>Tu contraseña ha sido restablecida exitosamente.</p>
            <Link to="/login" className={styles.primaryButton}>
              Ir a Iniciar Sesión
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!token) {
    return (
      <main className={styles.content}>
        <div className={styles.loginForm}>
          <h3 style={{ textAlign: "center" }}>Enlace No Válido</h3>
          <p>
            Este enlace no es válido o ha expirado. Por favor, solicita uno
            nuevo.
          </p>
          <Link to="/reset-password" className={styles.primaryButton}>
            Solicitar Nuevo Enlace
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.content}>
      <h1 className={styles["page-title"]}>Crear Nueva Contraseña</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h3>Ingresa tu nueva contraseña.</h3>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {localError && <p className={styles.errorMessage}>{localError}</p>}

        {resetPasswordConfirm.isError && (
          <>
            <p className={styles.errorMessage}>
              Algo salio mal, por favor intentalo de nuevo.
            </p>
            <Link to="/reset-password" className={styles.primaryButton}>
              Solicitar Nuevo Enlace
            </Link>
          </>
        )}

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={resetPasswordConfirm.isPending}
        >
          {resetPasswordConfirm.isPending
            ? "Guardando..."
            : "Guardar Contraseña"}
        </button>
      </form>
    </main>
  );
}
