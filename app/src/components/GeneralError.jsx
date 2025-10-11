import { Link } from "@tanstack/react-router";
import styles from "../styles/ErrorPage.module.css";

// import errorImage from "../../assets/error-signpost.svg";

function GeneralError({ error }) {
  const isDevelopment = import.meta.env.DEV;

  return (
    <main className={styles.container}>
      {/* <img
        src={errorImage}
        alt="Señal de camino rota"
        className={styles.image}
      /> */}
      <h1 className={styles.title}>¡Ups! Encontramos un bache en el camino</h1>
      <p className={styles.subtitle}>
        Ocurrió un error inesperado en nuestra ruta. Nuestro equipo ya está
        trabajando para solucionarlo.
      </p>
      <Link to="/" className={styles.ctaButton}>
        Volver al Inicio
      </Link>

      {isDevelopment && (
        <pre className={styles.errorCode}>
          <code>
            {error instanceof Error
              ? error.stack
              : JSON.stringify(error, null, 2)}
          </code>
        </pre>
      )}
    </main>
  );
}

export default GeneralError;
