import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import styles from "../styles/Admin.module.css";
import { FaWhatsapp, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useCreateBooking } from "../data/bookings";

function UserCard({
  user,
  trips,
  onToggleSubscription,
  updateUserMutation,
  deleteUserMutation,
  deleteBookingMutation,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [newBookingTripId, setNewBookingTripId] = useState("");
  const createBookingMutation = useCreateBooking();

  const bookingHistory = useMemo(() => {
    if (!user.bookings) return [];
    return user.bookings.map((booking) => {
      const trip = trips.find((t) => t.id === booking.tripId);
      return {
        ...booking,
        tripName: trip ? trip.destination : "Viaje no encontrado",
        isPast: trip ? new Date(trip.endDate) < new Date() : false,
      };
    });
  }, [user.bookings, trips]);

  const bookingCount = useMemo(() => bookingHistory.length, [bookingHistory]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUserMutation.mutate(
      { userId: user.id, userInfo: formData },
      {
        onSuccess: () => {
          alert("Usuario actualizado.");
          setShowEdit(false);
        },
        onError: (error) => {
          alert(`Error al actualizar: ${error.message}`);
        },
      }
    );
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!newBookingTripId) {
      alert("Por favor selecciona un viaje.");
      return;
    }
    createBookingMutation.mutate(
      { userId: user.id, tripId: newBookingTripId },
      {
        onSuccess: () => {
          alert("¡Reservación registrada con éxito!");
          setNewBookingTripId("");
        },
        onError: (error) => {
          alert(`Error al registrar reservación: ${error.message}`);
        },
      }
    );
  };

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(
      { userId: user.id },
      {
        onSuccess: () => {
          alert("Usuario eliminado.");
          setIsDeleteUserModalOpen(false);
        },
        onError: (error) => {
          alert(`Error al eliminar: ${error.message}`);
          setIsDeleteUserModalOpen(false);
        },
      }
    );
  };

  const handleConfirmDeleteBooking = () => {
    if (!bookingToDelete) return;

    deleteBookingMutation.mutate(
      {
        userId: bookingToDelete.userId,
        tripId: bookingToDelete.tripId,
      },
      {
        onSuccess: () => {
          alert("Reservación eliminada.");
          setBookingToDelete(null);
        },
        onError: (error) => {
          alert(`Error al eliminar reservación: ${error.message}`);
          setBookingToDelete(null);
        },
      }
    );
  };

  return (
    <>
      <div className={styles.userListItem}>
        <div className={styles.userHeader}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userContact}>{user.email}</span>
            <span className={styles.userContact}>{user.phone}</span>
            <button
              className={styles.textButton}
              onClick={() => {
                setShowBookings(!showBookings);
                setShowEdit(false);
              }}
            >
              {bookingCount}{" "}
              {bookingCount === 1 ? "Reservación" : "Reservaciones"}
              {showBookings ? (
                <FaChevronUp className={styles.textButtonIcon} />
              ) : (
                <FaChevronDown className={styles.textButtonIcon} />
              )}
            </button>
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
              onClick={() => {
                setShowEdit(!showEdit);
                setShowBookings(false);
              }}
              className={showEdit ? styles.closeButton : styles.editButton}
            >
              {showEdit ? "Cerrar" : "Editar"}
            </button>
            <button
              onClick={() => setIsDeleteUserModalOpen(true)}
              className={styles.deleteButton}
            >
              Eliminar
            </button>
          </div>
        </div>

        {(showEdit || showBookings) && (
          <div className={styles.userExpandableContent}>
            {showEdit && (
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
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={updateUserMutation.isPending}
                >
                  {updateUserMutation.isPending
                    ? "Guardando"
                    : "Guardar Cambios"}
                </button>
              </form>
            )}

            {showBookings && (
              <div className={styles.userDetails}>
                <div className={styles.bookingHistory}>
                  <h4>Historial de Viajes</h4>
                  {bookingHistory.length > 0 ? (
                    <ul className={styles.bookingHistoryList}>
                      {bookingHistory.map((b) => (
                        <li key={b.tripId}>
                          <Link
                            to="/admin/reservaciones"
                            search={{ tripId: b.tripId }}
                          >
                            {b.tripName}
                          </Link>
                          <div className={styles.bookingHistoryActions}>
                            <span
                              className={
                                b.isPast
                                  ? styles.pastTripBadge
                                  : styles.upcomingTripBadge
                              }
                            >
                              {b.isPast ? "Completado" : "Próximo"}
                            </span>
                            {!b.isPast && (
                              <button
                                className={styles.deleteBookingButton}
                                onClick={() => setBookingToDelete(b)}
                                aria-label="Eliminar reservación"
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Esta clienta aún no tiene viajes registrados.</p>
                  )}
                </div>
                <form
                  onSubmit={handleCreateBooking}
                  className={styles.editUserForm}
                >
                  <h4>Registrar Nueva Reservación</h4>
                  <div className={styles.formGroup}>
                    <label htmlFor={`booking-trip-${user.id}`}>Viaje</label>
                    <select
                      id={`booking-trip-${user.id}`}
                      value={newBookingTripId}
                      onChange={(e) => setNewBookingTripId(e.target.value)}
                    >
                      <option value="" disabled>
                        Selecciona un viaje
                      </option>
                      {trips
                        .filter((t) => new Date(t.endDate) >= new Date())
                        .sort(
                          (a, b) =>
                            new Date(a.startDate) - new Date(b.startDate)
                        )
                        .map((trip) => (
                          <option key={trip.id} value={trip.id}>
                            {trip.destination}
                          </option>
                        ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={createBookingMutation.isPending}
                  >
                    {createBookingMutation.isPending
                      ? "Registrando..."
                      : "Registrar Reservación"}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      {isDeleteUserModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsDeleteUserModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirmar Eliminación</h3>
            <p>
              ¿Estás segura que quieres eliminar a <strong>{user.name}</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.deleteButton}
                disabled={deleteUserMutation.isPending}
                onClick={handleDeleteUser}
              >
                {deleteUserMutation.isPending
                  ? "Eliminando..."
                  : "Sí, Eliminar"}
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setIsDeleteUserModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingToDelete && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setBookingToDelete(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirmar Eliminación</h3>
            <p>
              ¿Estás segura que quieres eliminar la reservación de{" "}
              <strong>{user.name}</strong> para el viaje a{" "}
              <strong>{bookingToDelete.tripName}</strong>?
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.deleteButton}
                disabled={deleteBookingMutation.isPending}
                onClick={handleConfirmDeleteBooking}
              >
                {deleteBookingMutation.isPending
                  ? "Eliminando..."
                  : "Sí, Eliminar"}
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setBookingToDelete(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserCard;
