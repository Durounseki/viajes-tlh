import { Link, createFileRoute } from "@tanstack/react-router";
import styles from "../../../styles/Admin.module.css";
import { tripsQueryOptions, useTrips } from "../../../data/trips";
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
  const handleDelete = (trip) => {
    if (
      confirm(
        `¿Estás segura de que quieres eliminar el viaje a ${trip.destination}?`
      )
    ) {
      console.log("Deleting trip:", trip.id);
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

      <div className={styles.adminTripsGrid}>
        {trips.map((trip) => (
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
        ))}
      </div>
    </div>
  );
}
