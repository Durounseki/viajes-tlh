import { useState } from "react";
import styles from "../styles/Admin.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { formatPrice } from "../utils/tripPrice.js";
import { useCreatePayment } from "../data/bookings.js";

function PendingPaymentCard({ booking }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transferencia");
  const createPaymentMutation = useCreatePayment();

  const { user, trip, balance, userId, tripId } = booking;

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
        bookingUserId: userId,
        bookingTripId: tripId,
      },
      {
        onSuccess: () => {
          alert("¡Pago registrado!");
          setPaymentAmount("");
          setIsModalOpen(false);
        },
        onError: (error) => {
          alert(`Error al registrar pago: ${error.message}`);
        },
      }
    );
  };

  return (
    <>
      <div className={styles.pendingItem}>
        <div className={styles.pendingInfo}>
          <span className={styles.pendingUser}>{user.name}</span>
          <span className={styles.pendingTrip}>{trip.destination}</span>
          <span className={styles.pendingBalance}>
            Saldo: {formatPrice(balance)}
          </span>
        </div>

        <div className={styles.paymentCardActions}>
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
            className={styles.editButton}
            onClick={() => setIsModalOpen(true)}
          >
            Registrar Pago
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Registrar Pago para {user.name}</h3>
            <p
              style={{
                textAlign: "center",
                marginTop: "-1rem",
                marginBottom: "1.5rem",
                color: "var(--color-secondary)",
              }}
            >
              Viaje: {trip.destination} (Saldo: {formatPrice(balance)})
            </p>

            <form
              onSubmit={handleAddPayment}
              className={styles.addPaymentForm}
              style={{ padding: 0, background: "none" }}
            >
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
              <div className={styles.modalActions}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={createPaymentMutation.isPending}
                >
                  {createPaymentMutation.isPending
                    ? "Guardando..."
                    : "Guardar Pago"}
                </button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PendingPaymentCard;
