import { useState } from "react";
import styles from "../styles/Admin.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { formatPrice } from "../utils/tripPrice";
import { useCreatePayment } from "../data/bookings";

function BookingCard({ booking, user, tripPrice }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transferencia");
  const createPaymentMutation = useCreatePayment();

  const totalPaid = booking.payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = tripPrice - totalPaid;

  const handleAddPayment = (e) => {
    e.preventDefault();
    const amountNum = parseInt(paymentAmount, 10);
    if (!amountNum || amountNum <= 0) {
      alert("Por favor ingresa un monto válido.");
      return;
    }

    createPaymentMutation.mutate(
      {
        amount: amountNum,
        method: paymentMethod,
        bookingUserId: booking.userId,
        bookingTripId: booking.tripId,
      },
      {
        onSuccess: () => {
          alert("¡Pago registrado!");
          setPaymentAmount("");
          setIsExpanded(false);
        },
        onError: (error) => {
          alert(`Error al registrar pago: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className={styles.bookingListItem}>
      <div className={styles.bookingHeader}>
        <div className={styles.bookingInfo}>
          <span className={styles.bookingUserName}>{user?.name}</span>
          <span className={styles.bookingDate}>
            Reservó: {new Date(booking.bookingDate).toLocaleDateString()}
          </span>
          <span
            className={balance <= 0 ? styles.paidStatus : styles.pendingStatus}
          >
            Saldo: <strong>{formatPrice(balance)}</strong>
          </span>
        </div>
        <div className={styles.bookingActions}>
          <a
            href={`https://wa.me/521${user?.phone}`}
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
            {isExpanded ? "Cerrar" : "Ver Pagos"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.bookingDetails}>
          <div className={styles.paymentDetails}>
            <h4>Historial de Pagos</h4>
            {booking.payments.length > 0 ? (
              <ul className={styles.paymentList}>
                {booking.payments.map((p) => (
                  <li key={p.id}>
                    <span>
                      {new Date(p.paymentDate).toLocaleDateString()} ({p.method}
                      )
                    </span>
                    <strong>{formatPrice(p.amount)}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay pagos registrados.</p>
            )}
            <div className={styles.paymentSummary}>
              <p>
                <span>Total Pagado:</span>
                <strong>{formatPrice(totalPaid)}</strong>
              </p>
              <p>
                <span>Precio del Viaje:</span>
                <strong>{formatPrice(tripPrice)}</strong>
              </p>
              <p
                className={
                  balance <= 0 ? styles.paidStatus : styles.pendingStatus
                }
              >
                <span>Saldo Pendiente:</span>
                <strong>{formatPrice(balance)}</strong>
              </p>
            </div>
          </div>

          <form onSubmit={handleAddPayment} className={styles.addPaymentForm}>
            <h4>Registrar Nuevo Pago</h4>
            <div className={styles.formRow}>
              <input
                type="number"
                placeholder="Monto"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                required
              />
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Transferencia">Transferencia</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={createPaymentMutation.isPending}
            >
              {createPaymentMutation.isPending
                ? "Guardando..."
                : "Guardar Pago"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookingCard;
