import styles from "../styles/TripCard.module.css";
import { formatTripDate } from "../utils/tripDate";
import { formatPrice } from "../utils/tripPrice";

function TripCard({ trip }) {
  const isPastTrip = new Date(trip.endDate) < new Date();
  const cardClass = isPastTrip
    ? `${styles["trip-card"]} ${styles["past-trip-card"]}`
    : styles["trip-card"];
  const thumbnail =
    trip.images.find((img) => img.id === trip.thumbnailId) || trip.images[0];
  const formattedPrice = formatPrice(trip.price, trip.currency);
  return (
    <div className={cardClass}>
      <img
        src={thumbnail.src}
        alt={thumbnail.alt || `Viaje a ${trip.destination}`}
      />
      {!isPastTrip && (
        <div className={styles["price-tag"]}>{formattedPrice}</div>
      )}
      <div className={styles["card-content"]}>
        <h3>{trip.destination}</h3>
        {!isPastTrip && <p>{formatTripDate(trip.startDate, trip.endDate)}</p>}
      </div>
    </div>
  );
}

export default TripCard;
