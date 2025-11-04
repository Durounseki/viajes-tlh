import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../data/auth";
import styles from "../../styles/Login.module.css";

export const Route = createFileRoute("/admin/ajustes")({
  component: RouteComponent,
});

function RouteComponent() {
  const { changePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    changePassword.reset();

    if (newPassword !== confirmPassword) {
      setLocalError("Las nuevas contraseñas no coinciden.");
      return;
    }

    if (newPassword.length < 8) {
      setLocalError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    changePassword.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
      }
    );
  };

  return (
    <div className={styles.settings}>
      <h2>Ajustes</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h3>Cambiar Contraseña</h3>

        <div className={styles.formGroup}>
          <label htmlFor="oldPassword">Contraseña Actual</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

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
          <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {localError && <p className={styles.errorMessage}>{localError}</p>}

        {changePassword.isError && (
          <p className={styles.errorMessage}>
            Algo salió mal, por favor intentalo de nuevo.
          </p>
        )}

        {changePassword.isSuccess && (
          <p className={styles.successMessage}>¡Contraseña actualizada!</p>
        )}

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={changePassword.isPending}
        >
          {changePassword.isPending ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
