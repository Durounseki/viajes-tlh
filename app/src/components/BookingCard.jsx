import { useState } from "react";
import styles from "../styles/Admin.module.css";
import { FaWhatsapp, FaEdit, FaTrash } from "react-icons/fa";
import { formatPrice } from "../utils/tripPrice";
import { useCreatePayment } from "../data/bookings";

function BookingCard({
  booking,
  user,
  tripPrice,
  updatePaymentMutation,
  deletePaymentMutation,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  const [editFormData, setEditFormData] = useState({
    amount: "",
    method: "Transferencia",
    reference: "",
  });

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
          setShowAddPayment(false);
        },
        onError: (error) => {
          alert(`Error al registrar pago: ${error.message}`);
        },
      }
    );
  };

  const handleOpenEditModal = (payment) => {
    setEditingPayment(payment);
    setEditFormData({
      amount: payment.amount,
      method: payment.method,
      reference: payment.reference || "",
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditPayment = (e) => {
    e.preventDefault();
    const amountNum = parseInt(editFormData.amount, 10);
    if (!amountNum || amountNum <= 0) {
      alert("Por favor ingresa un monto válido.");
      return;
    }

    updatePaymentMutation.mutate(
      {
        paymentId: editingPayment.id,
        paymentInfo: {
          amount: amountNum,
          method: editFormData.method,
          reference: editFormData.reference || null,
        },
      },
      {
        onSuccess: () => {
          alert("¡Pago actualizado!");
          setEditingPayment(null);
        },
        onError: (error) => {
          alert(`Error al actualizar pago: ${error.message}`);
        },
      }
    );
  };

  const handleConfirmDeletePayment = () => {
    if (!paymentToDelete) return;
    deletePaymentMutation.mutate(
      { paymentId: paymentToDelete.id },
      {
        onSuccess: () => {
          alert("Pago eliminado.");
          setPaymentToDelete(null);
        },
        onError: (error) => {
          alert(`Error al eliminar pago: ${error.message}`);
          setPaymentToDelete(null);
        },
      }
    );
  };

  return (
    <>
      <div className={styles.bookingListItem}>
        <div className={styles.bookingHeader}>
          <div className={styles.bookingInfo}>
            <span className={styles.bookingUserName}>{user?.name}</span>
            <span className={styles.bookingDate}>
              Reservó: {new Date(booking.bookingDate).toLocaleDateString()}
            </span>
            <span
              className={
                balance <= 0 ? styles.paidStatus : styles.pendingStatus
              }
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
              onClick={() => {
                setIsExpanded(!isExpanded);
                if (isExpanded) setShowAddPayment(false);
              }}
              className={isExpanded ? styles.closeButton : styles.editButton}
            >
              {isExpanded ? "Cerrar Detalles" : "Ver Detalles"}
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
                      <div className={styles.paymentInfo}>
                        <span>
                          {new Date(p.paymentDate).toLocaleDateString()} (
                          {p.method})
                          {p.reference ? ` - Ref: ${p.reference}` : ""}
                        </span>{" "}
                        <strong>{formatPrice(p.amount)}</strong>
                      </div>
                      <div className={styles.paymentActions}>
                        <button
                          className={styles.iconButton}
                          onClick={() => handleOpenEditModal(p)}
                          aria-label="Editar pago"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className={`${styles.iconButton} ${styles.deleteIcon}`}
                          onClick={() => setPaymentToDelete(p)}
                          aria-label="Eliminar pago"
                        >
                          <FaTrash />
                        </button>
                      </div>
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
              <button
                className={styles.secondaryButton}
                onClick={() => setShowAddPayment(!showAddPayment)}
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {showAddPayment
                  ? "Cancelar Nuevo Pago"
                  : "Registrar Nuevo Pago"}
              </button>
            </div>

            {showAddPayment && (
              <form
                onSubmit={handleAddPayment}
                className={styles.addPaymentForm}
              >
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
            )}
          </div>
        )}
      </div>
      {editingPayment && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setEditingPayment(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Editar Pago</h3>
            <p>
              Pago del{" "}
              {new Date(editingPayment.paymentDate).toLocaleDateString()}
            </p>
            <form
              className={styles.editPaymentForm}
              onSubmit={handleEditPayment}
            >
              <div className={styles.formGroup}>
                <label htmlFor="edit-amount">Monto</label>
                <input
                  type="number"
                  id="edit-amount"
                  name="amount"
                  value={editFormData.amount}
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-method">Método</label>
                <select
                  id="edit-method"
                  name="method"
                  value={editFormData.method}
                  onChange={handleEditFormChange}
                >
                  <option value="Transferencia">Transferencia</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-reference">Referencia (Opcional)</label>
                <input
                  type="text"
                  id="edit-reference"
                  name="reference"
                  value={editFormData.reference}
                  onChange={handleEditFormChange}
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={updatePaymentMutation.isPending}
                >
                  {updatePaymentMutation.isPending
                    ? "Guardando..."
                    : "Guardar Cambios"}
                </button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setEditingPayment(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {paymentToDelete && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setPaymentToDelete(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirmar Eliminación</h3>
            <p>
              ¿Estás segura que quieres eliminar este pago de{" "}
              <strong>{formatPrice(paymentToDelete.amount)}</strong> del{" "}
              {new Date(paymentToDelete.paymentDate).toLocaleDateString()}?
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleConfirmDeletePayment}
                disabled={deletePaymentMutation.isPending}
              >
                {deletePaymentMutation.isPending
                  ? "Eliminando..."
                  : "Sí, Eliminar"}
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setPaymentToDelete(null)}
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

export default BookingCard;
