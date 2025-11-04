import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../styles/Login.module.css";
import { useAuth } from "../data/auth";

export const Route = createFileRoute("/reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword.mutate({ email });
  };

  if (resetPassword.isSuccess) {
    return (
      <main className={styles.content}>
        <div className={styles.loginForm}>
          <div className={styles.resetPasswordMessage}>
            <h3>Correo Enviado</h3>
            <p>
              Recibirás un corre a<br /> <b>{email}</b>
              <br />
              Sigue las instrucciones para restablecer tu contraseña.
            </p>
            <Link to="/login" className={styles.primaryButton}>
              Volver a Iniciar Sesión
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.content}>
      <h1 className={styles["page-title"]}>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h3>Ingresa tu email (usuario) para recibir instrucciones.</h3>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
          />
        </div>

        {resetPassword.isError && (
          <p className={styles.errorMessage}>{resetPassword.error.message}</p>
        )}

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={resetPassword.isPending}
        >
          {resetPassword.isPending ? "Enviando..." : "Enviar Instrucciones"}
        </button>

        <div className={styles.forgotPassword} style={{ marginTop: "1rem" }}>
          <Link to="/login">Volver a Iniciar Sesión</Link>
        </div>
      </form>
    </main>
  );
}
