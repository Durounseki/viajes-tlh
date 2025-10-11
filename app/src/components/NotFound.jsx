import { Link } from "@tanstack/react-router";
import styles from "../styles/ErrorPage.module.css";
// import notFoundImage from "../../assets/not-found-compass.svg";

function NotFound() {
  return (
    <main className={styles.container}>
      {/* <img src={notFoundImage} alt="Brújula perdida" className={styles.image} /> */}
      <h1 className={styles.title}>Parece que te has desviado del camino</h1>
      <p className={styles.subtitle}>
        La página que buscas no existe o ha sido movida. ¡No te preocupes!
        Podemos guiarte de regreso.
      </p>
      <Link to="/" className={styles.ctaButton}>
        Volver al Inicio
      </Link>
    </main>
  );
}

export default NotFound;
