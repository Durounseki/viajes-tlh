import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../../styles/Admin.module.css";
import { trips, users, bookings } from "../../data/viajes-data";
import { FaWhatsapp } from "react-icons/fa";
import BookingCard from "../../components/BookingCard";

export const Route = createFileRoute("/admin/reservaciones")({
  component: RouteComponent,
});

function RouteComponent() {
  const upcomingTrips = trips
    .filter((t) => new Date(t.endDate) >= new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const [selectedTripId, setSelectedTripId] = useState(
    upcomingTrips[0]?.id || ""
  );

  const selectedTrip = useMemo(
    () => trips.find((t) => t.id === selectedTripId),
    [selectedTripId]
  );

  const filteredBookings = useMemo(() => {
    if (!selectedTripId) return [];
    return bookings
      .filter((b) => b.tripId === selectedTripId)
      .map((booking) => {
        const user = users.find((u) => u.id === booking.userId);
        return { ...booking, user };
      });
  }, [selectedTripId]);

  const tripStats = useMemo(() => {
    const selectedTrip = trips.find((t) => t.id === selectedTripId);
    if (!selectedTrip) return { totalPaid: 0, totalOwed: 0 };

    let totalPaid = 0;
    filteredBookings.forEach((b) => {
      totalPaid += b.payments.reduce((sum, p) => sum + p.amount, 0);
    });
    const totalValue = selectedTrip.price * filteredBookings.length;
    return {
      totalPaid,
      totalOwed: totalValue - totalPaid,
    };
  }, [filteredBookings, selectedTripId]);

  return (
    <div className={styles.bookingsPage}>
      <div className={styles.pageHeader}>
        <h3>Reservaciones</h3>
      </div>

      <div className={styles.filterBar}>
        <label htmlFor="trip-filter">Mostrando viaje:</label>
        <select
          id="trip-filter"
          value={selectedTripId}
          onChange={(e) => setSelectedTripId(e.target.value)}
        >
          {upcomingTrips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.destination}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>{filteredBookings.length}</h3>
          <p>Reservaciones Totales</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
            }).format(tripStats.totalPaid)}
          </h3>
          <p>Total Pagado</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
            }).format(tripStats.totalOwed)}
          </h3>
          <p>Saldo Pendiente</p>
        </div>
      </div>

      <div className={styles.bookingList}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard
              key={booking.user.id}
              booking={booking}
              tripPrice={selectedTrip?.price || 0}
            />
          ))
        ) : (
          <p>No hay reservaciones para este viaje todavía.</p>
        )}
      </div>
    </div>
  );
}
