import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import styles from "../../../styles/Admin.module.css";
import {
  tripsQueryOptions,
  useTrips,
  useDeleteTrip,
} from "../../../data/trips";
import TripCard from "../../../components/TripCard";
import TripsAdminPendingComponent from "../../../components/TripsAdminPendingComponent";

export const Route = createFileRoute("/admin/viajes/")({
  component: TripsAdminComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await queryClient.ensureQueryData(tripsQueryOptions);
    return {};
  },
  pendingComponent: TripsAdminPendingComponent,
});

function TripsAdminComponent() {
  const { data: trips = [] } = useTrips();
  const deleteTripMutation = useDeleteTrip();
  const [activeTab, setActiveTab] = useState("upcoming");

  const { upcomingTrips, draftTrips, pastTrips } = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const drafts = [];
    const past = [];

    trips.forEach((trip) => {
      if (trip.status === "DRAFT") {
        drafts.push(trip);
      } else if (!trip.endDate) {
        drafts.push(trip);
      } else if (new Date(trip.endDate) < now) {
        past.push(trip);
      } else {
        upcoming.push(trip);
      }
    });

    upcoming.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    past.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    return { upcomingTrips: upcoming, draftTrips: drafts, pastTrips: past };
  }, [trips]);

  const tripsToDisplay = {
    upcoming: upcomingTrips,
    drafts: draftTrips,
    past: pastTrips,
  }[activeTab];

  const handleDelete = (trip) => {
    if (
      confirm(
        `¿Estás segura de que quieres eliminar el viaje a ${trip.destination}?`
      )
    ) {
      deleteTripMutation.mutate(trip.id, {
        onSuccess: () => {
          alert("Viaje eliminado con éxito.");
        },
        onError: (error) => {
          alert("No se pudo eliminar el viaje:", error.message);
        },
      });
    }
  };

  return (
    <div className={styles.tripsPage}>
      <div className={styles.pageHeader}>
        <h3>Tus Viajes</h3>
        <Link to="/admin/viajes/nuevo" className={styles.primaryButton}>
          + Crear Nuevo Viaje
        </Link>
      </div>

      <div className={styles.tabBar}>
        <button
          className={activeTab === "upcoming" ? styles.activeTab : ""}
          onClick={() => setActiveTab("upcoming")}
        >
          Próximos ({upcomingTrips.length})
        </button>
        <button
          className={activeTab === "drafts" ? styles.activeTab : ""}
          onClick={() => setActiveTab("drafts")}
        >
          Borradores ({draftTrips.length})
        </button>
        <button
          className={activeTab === "past" ? styles.activeTab : ""}
          onClick={() => setActiveTab("past")}
        >
          Pasados ({pastTrips.length})
        </button>
      </div>
      <div className={styles.adminTripsGrid}>
        {tripsToDisplay.length > 0 ? (
          tripsToDisplay.map((trip) => (
            <div key={trip.id} className={styles.adminTripCard}>
              <TripCard trip={trip} />
              <div className={styles.adminTripActions}>
                <Link
                  to={`/admin/viajes/${trip.id}/editar`}
                  className={styles.editButton}
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(trip)}
                  className={styles.deleteButton}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyListMessage}>
            No hay viajes en esta sección.
          </p>
        )}
      </div>
    </div>
  );
}
