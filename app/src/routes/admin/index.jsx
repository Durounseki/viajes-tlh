import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../../styles/Admin.module.css";
import { tripsQueryOptions, useTrips } from "../../data/trips";
import { usersQueryOptions, useUsers } from "../../data/users";
import { bookingsQueryOptions, useBookings } from "../../data/bookings";
import PendingPaymentCard from "../../components/PendingPaymentCard";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await Promise.all([
      queryClient.ensureQueryData(tripsQueryOptions),
      queryClient.ensureQueryData(usersQueryOptions),
      queryClient.ensureQueryData(bookingsQueryOptions),
    ]);
    return {};
  },
});

function getNextUpcomingTrip(trips) {
  const upcoming = trips
    .filter((t) => new Date(t.endDate) >= new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  return upcoming[0] || null;
}

function getDaysRemaining(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  const diffTime = Math.abs(start - now);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getPendingPayments(bookings, trips, users) {
  return bookings
    .map((booking) => {
      const trip = trips.find((t) => t.id === booking.tripId);
      const user = users.find((u) => u.id === booking.userId);
      if (!trip || !user || new Date(trip.endDate) < new Date()) return null;

      const totalPaid = booking.payments.reduce((sum, p) => sum + p.amount, 0);
      const balance = trip.price - totalPaid;

      return balance > 0 ? { ...booking, user, trip, balance } : null;
    })
    .filter(Boolean);
}

function RouteComponent() {
  const { data: trips = [] } = useTrips();
  const { data: users = [] } = useUsers();
  const { data: bookings = [] } = useBookings();

  const stats = useMemo(() => {
    const nextTrip = getNextUpcomingTrip(trips);
    const nextTripBookings = nextTrip
      ? bookings.filter((b) => b.tripId === nextTrip.id).length
      : 0;

    const pendingPayments = getPendingPayments(bookings, trips, users);

    return {
      nextTrip,
      nextTripBookings,
      pendingPayments,
    };
  }, [trips, users, bookings]);

  return (
    <div className={styles.dashboard}>
      {stats.nextTrip ? (
        <div className={`${styles.statCard} ${styles.dashboardSpotlight}`}>
          <h3>Próximo Viaje: {stats.nextTrip.destination}</h3>
          <p>¡Faltan {getDaysRemaining(stats.nextTrip.startDate)} días!</p>
          <div className={styles.spotlightStats}>
            <span>{stats.nextTripBookings} Reservaciones</span>
            <Link to="/admin/reservaciones" className={styles.spotlightLink}>
              Ver Detalles →
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.statCard}>
          <p>No hay viajes próximos programados.</p>
        </div>
      )}

      <div className={styles.quickActions}>
        <Link to="/admin/viajes/nuevo" className={styles.actionButton}>
          <span className={styles.actionIcon}>✈️</span>
          <span>Crear Nuevo Viaje</span>
        </Link>
        <Link to="/admin/reservaciones" className={styles.actionButton}>
          <span className={styles.actionIcon}>🎟️</span>
          <span>Ver Reservaciones</span>
        </Link>
        <Link to="/admin/usuarios" className={styles.actionButton}>
          <span className={styles.actionIcon}>👥</span>
          <span>Ver Clientes</span>
        </Link>
      </div>

      <div className={styles.pendingPaymentsList}>
        <h4>Pagos Pendientes ({stats.pendingPayments.length})</h4>
        {stats.pendingPayments.length > 0 ? (
          stats.pendingPayments.map((booking) => (
            <PendingPaymentCard
              key={booking.userId + booking.tripId}
              booking={booking}
            />
          ))
        ) : (
          <p>¡Felicidades! No hay pagos pendientes.</p>
        )}
      </div>
    </div>
  );
}
