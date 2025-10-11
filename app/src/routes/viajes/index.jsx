import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../../styles/Viajes.module.css";
import { trips } from "../../data/viajes-data";
import TripCard from "../../components/TripCard";

export const Route = createFileRoute("/viajes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const now = new Date();
  const limit = 3;

  const upcomingTrips = trips
    .filter((trip) => new Date(trip.endDate) >= now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const pastTrips = trips
    .filter((trip) => new Date(trip.endDate) < now)
    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  return (
    <main className={styles["page-container"]}>
      <h1 className={styles["page-title"]}>Nuestras Aventuras</h1>

      <section className={styles["upcoming-trips-section"]}>
        <h2 className={styles["section-title"]}>Próximos Viajes</h2>
        <div className={styles["trips-grid"]}>
          {upcomingTrips.slice(0, limit).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
        {upcomingTrips.length > limit && (
          <Link to="/viajes" className={styles["cta-button"]}>
            Ver Todos los Viajes
          </Link>
        )}
      </section>

      <section className={styles["past-trips-section"]}>
        <h2 className={styles["section-title"]}>Viajes Pasados</h2>
        <p className={styles["section-subtitle"]}>
          Mira los lugares que hemos descubierto juntas.
        </p>
        <div className={styles["trips-grid"]}>
          {pastTrips.slice(0, limit).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
        {pastTrips.length > limit && (
          <Link to="/galeria" className={styles["cta-button"]}>
            Ver Galería Completa
          </Link>
        )}
      </section>
    </main>
  );
}
