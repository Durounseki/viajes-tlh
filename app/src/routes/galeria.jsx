import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../styles/Galeria.module.css";

import comingSoonImage from "../assets/proximamente.jpg";

export const Route = createFileRoute("/galeria")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <img
          src={comingSoonImage}
          alt="Recuerdos de viaje siendo coleccionados"
          className={styles.image}
        />
        <h1 className={styles.title}>Próximamente: Galería de Recuerdos</h1>
        <p className={styles.subtitle}>
          Estamos seleccionando con mucho cariño las mejores fotos y momentos de
          nuestras aventuras pasadas. Vuelve pronto para revivir la magia y la
          amistad de los viajes de Nehnemi.
        </p>
        <Link to="/viajes/proximos" className={styles.ctaButton}>
          Ver Próximos Viajes
        </Link>
      </div>
    </main>
  );
}
