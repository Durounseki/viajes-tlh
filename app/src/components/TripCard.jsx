import styles from "../styles/TripCard.module.css";
import { formatTripDate } from "../utils/tripDate";

function TripCard({ trip }) {
  const isPastTrip = new Date(trip.endDate) < new Date();
  const cardClass = isPastTrip
    ? `${styles["trip-card"]} ${styles["past-trip-card"]}`
    : styles["trip-card"];
  return (
    <div className={cardClass}>
      <img
        src={trip.images[trip.thumbnailIndex]}
        alt={`Viaje a ${trip.destination}`}
      />
      {!isPastTrip && <div className={styles["price-tag"]}>{trip.price}</div>}
      <div className={styles["card-content"]}>
        <h3>{trip.destination}</h3>
        {!isPastTrip && <p>{formatTripDate(trip.startDate, trip.endDate)}</p>}
      </div>
    </div>
  );
}

export default TripCard;
