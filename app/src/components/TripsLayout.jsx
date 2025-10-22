import { Link } from "@tanstack/react-router";
import styles from "../styles/Viajes.module.css";
import TripCard from "./TripCard";

function TripsLayout({
  title,
  subtitle,
  trips,
  ctaTitle,
  ctaSubtitle,
  ctaText,
}) {
  return (
    <main className={styles["page-container"]}>
      <h1 className={styles["page-title"]}>{title}</h1>
      <p className={styles["page-subtitle"]}>{subtitle}</p>
      <div className={styles["trips-grid"]}>
        {trips.map((trip) => (
          <Link to={`/viajes/${trip.id}`} key={trip.id}>
            <TripCard trip={trip} />
          </Link>
        ))}
      </div>
      {trips.length === 0 && (
        <p className={styles["no-trips-message"]}>No hay viajes aun.</p>
      )}
      <section className={styles["cta-section"]}>
        <h2>{ctaTitle}</h2>
        <p>{ctaSubtitle}</p>
        <a
          href="https://wa.me/5215500000000?text=Hola!%20Me%20gustaría%20sugerir%20un%20futuro%20viaje%20a..."
          className={styles["cta-button"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaText}
        </a>
      </section>
    </main>
  );
}

export default TripsLayout;
