import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import styles from "../styles/Admin.module.css";
import { FaWhatsapp } from "react-icons/fa";

import { trips, bookings } from "../data/viajes-data";

function UserCard({ user, onToggleSubscription }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const bookingHistory = useMemo(() => {
    return bookings
      .filter((b) => b.userId === user.id)
      .map((booking) => {
        const trip = trips.find((t) => t.id === booking.tripId);
        return {
          ...booking,
          tripName: trip ? trip.destination : "Viaje no encontrado",
          isPast: trip ? new Date(trip.endDate) < new Date() : false,
        };
      });
  }, [user.id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(`Saving user ${user.id}:`, formData);
    alert("Usuario actualizado (simulación).");
    setIsExpanded(false);
  };

  return (
    <div className={styles.userListItem}>
      <div className={styles.userHeader}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userContact}>{user.email}</span>
          <span className={styles.userContact}>{user.phone}</span>
        </div>
        <div className={styles.userActions}>
          <div className={styles.subscriptionToggle}>
            <label htmlFor={`sub-${user.id}`}>Suscrita</label>
            <label className={styles.switch}>
              <input
                id={`sub-${user.id}`}
                type="checkbox"
                checked={user.isSuscribed}
                onChange={() => onToggleSubscription(user.id)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <a
            href={`https://wa.me/521${user.phone}`}
            className={styles.whatsappIconButton}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <FaWhatsapp />
          </a>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={isExpanded ? styles.closeButton : styles.editButton}
          >
            {isExpanded ? "Cerrar" : "Editar"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.userDetails}>
          <form onSubmit={handleEditSubmit} className={styles.editUserForm}>
            <h4>Editar Cliente</h4>
            <div className={styles.formGroup}>
              <label htmlFor={`name-${user.id}`}>Nombre</label>
              <input
                type="text"
                id={`name-${user.id}`}
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`email-${user.id}`}>Email</label>
              <input
                type="email"
                id={`email-${user.id}`}
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`phone-${user.id}`}>Teléfono</label>
              <input
                type="tel"
                id={`phone-${user.id}`}
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit" className={styles.primaryButton}>
              Guardar Cambios
            </button>
          </form>

          <div className={styles.bookingHistory}>
            <h4>Historial de Viajes</h4>
            {bookingHistory.length > 0 ? (
              <ul className={styles.bookingHistoryList}>
                {bookingHistory.map((b) => (
                  <li key={b.tripId}>
                    <Link to={`/admin/reservaciones`}>{b.tripName}</Link>
                    <span
                      className={
                        b.isPast
                          ? styles.pastTripBadge
                          : styles.upcomingTripBadge
                      }
                    >
                      {b.isPast ? "Completado" : "Próximo"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Esta clienta aún no tiene viajes registrados.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
