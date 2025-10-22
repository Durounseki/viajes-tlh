import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import styles from "../../styles/Viajes.module.css";
import { tripsQueryOptions, useTrips } from "../../data/trips";
import TripCard from "../../components/TripCard";
import TripsPendingComponent from "../../components/TripsPendingComponent";

export const Route = createFileRoute("/viajes/")({
  component: RouteComponent,
  pendingComponent: TripsPendingComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await queryClient.ensureQueryData(tripsQueryOptions);
    return {};
  },
});

function RouteComponent() {
  const limit = 3;

  const { data: trips = [] } = useTrips();

  const { upcomingTrips, pastTrips } = useMemo(() => {
    const now = new Date();

    const upcoming = trips
      .filter((trip) => new Date(trip.endDate) >= now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    const past = trips
      .filter((trip) => new Date(trip.endDate) < now)
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    return { upcomingTrips: upcoming, pastTrips: past };
  }, [trips]);

  return (
    <main className={styles["page-container"]}>
      <h1 className={styles["page-title"]}>Nuestras Aventuras</h1>

      <section className={styles["upcoming-trips-section"]}>
        <h2 className={styles["section-title"]}>Próximos Viajes</h2>
        <div className={styles["trips-grid"]}>
          {upcomingTrips.slice(0, limit).map((trip) => (
            <Link key={trip.id} to={`/viajes/${trip.id}`}>
              <TripCard trip={trip} />
            </Link>
          ))}
        </div>
        {upcomingTrips.length === 0 && (
          <p>No hay viajes programados por el momento. ¡Vuelve pronto!</p>
        )}
        {upcomingTrips.length > limit && (
          <Link to="/viajes/proximos" className={styles["cta-button"]}>
            Ver Todos
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
            <Link key={trip.id} to={`/viajes/${trip.id}`}>
              <TripCard trip={trip} />
            </Link>
          ))}
        </div>
        {pastTrips.length > limit && (
          <Link to="/viajes/pasados" className={styles["cta-button"]}>
            Ver Todos
          </Link>
        )}
      </section>
    </main>
  );
}
