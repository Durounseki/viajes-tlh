import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../../styles/Viajes.module.css";
import { proximosViajes, viajesPasados } from "../../data/viajes-data";

export const Route = createFileRoute("/viajes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className={styles["page-container"]}>
      <h1 className={styles["page-title"]}>Nuestras Aventuras</h1>

      <section className={styles["upcoming-trips-section"]}>
        <h2 className={styles["section-title"]}>Próximos Viajes</h2>
        <div className={styles["trips-grid"]}>
          {proximosViajes.map((trip) => (
            <Link
              to={`/viajes/${trip.id}`}
              key={trip.id}
              className={styles["trip-card"]}
            >
              <img src={trip.imageSrc} alt={`Viaje a ${trip.destination}`} />
              <div className={styles["price-tag"]}>{trip.price}</div>
              <div className={styles["card-content"]}>
                <h3>{trip.destination}</h3>
                <p>{trip.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles["past-trips-section"]}>
        <h2 className={styles["section-title"]}>Viajes Pasados</h2>
        <p className={styles["section-subtitle"]}>
          Mira los lugares que hemos descubierto juntas.
        </p>
        <div className={styles["trips-grid"]}>
          {viajesPasados.map((trip) => (
            <Link
              to={`/viajes/${trip.id}`}
              key={trip.id}
              className={`${styles["trip-card"]} ${styles["past-trip-card"]}`}
            >
              <img src={trip.imageSrc} alt={`Viaje a ${trip.destination}`} />
              <div className={styles["card-content"]}>
                <h3>{trip.destination}</h3>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/galeria" className={styles["cta-button"]}>
          Ver Galería Completa
        </Link>
      </section>
    </main>
  );
}
