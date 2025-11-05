import { useState } from "react";
import { useAddReview } from "../data/reviews.js";
import styles from "../styles/ReviewModal.module.css";
import loginStyles from "../styles/Login.module.css";

export default function ReviewModal({ onClose }) {
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const addReview = useAddReview();

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview.mutate(
      { author, quote },
      {
        onSuccess: () => {},
      }
    );
  };

  if (addReview.isSuccess) {
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <h3>¡Gracias!</h3>
          <p>
            Tu reseña ha sido enviada. Aparecerá en el sitio una vez que sea
            aprobada.
          </p>
          <button onClick={onClose} className={loginStyles.primaryButton}>
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Deja tu Reseña</h2>
        <p>
          ¿Disfrutaste tu viaje? ¡Nos encantaría saber tu opinión para futuras
          viajeras!
        </p>
        <form onSubmit={handleSubmit} className={loginStyles.loginForm}>
          <div className={loginStyles.formGroup}>
            <label htmlFor="author">Tu Nombre</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className={loginStyles.formGroup}>
            <label htmlFor="quote">Tu Reseña</label>
            <textarea
              id="quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              required
              rows={4}
            />
          </div>

          {addReview.isError && (
            <p className={loginStyles.errorMessage}>
              {addReview.error.message}
            </p>
          )}

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.secondaryButton}
              disabled={addReview.isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={loginStyles.primaryButton}
              disabled={addReview.isPending}
            >
              {addReview.isPending ? "Enviando..." : "Enviar Reseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
