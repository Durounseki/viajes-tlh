import styles from "../styles/AdminReviews.module.css";
import loginStyles from "../styles/Login.module.css";

function ReviewCard({ review, onToggle, onDelete, isPending }) {
  return (
    <div key={review.id} className={styles.reviewCard}>
      <blockquote className={styles.reviewQuote}>"{review.quote}"</blockquote>
      <p className={styles.reviewAuthor}>- {review.author}</p>
      <p className={styles.reviewStatus}>
        Estado:{" "}
        <span
          className={review.isPublished ? styles.published : styles.unpublished}
        >
          {review.isPublished ? "Publicada" : "No Publicada"}
        </span>
      </p>
      <div className={styles.reviewActions}>
        <button
          className={loginStyles.primaryButton}
          onClick={() => onToggle(review)}
          disabled={isPending}
        >
          {review.isPublished ? "Despublicar" : "Publicar"}
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(review.id)}
          disabled={isPending}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ReviewCard;
