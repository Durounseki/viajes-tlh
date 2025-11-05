import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  allReviewsQueryOptions,
  useAllReviews,
  useUpdateReview,
  useDeleteReview,
} from "../../data/reviews.js";
import styles from "../../styles/AdminReviews.module.css";
import ReviewCard from "../../components/ReviewCard.jsx";

export const Route = createFileRoute("/admin/reseñas")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(allReviewsQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  const { data: reviews = [] } = useAllReviews();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();

  const { published, unpublished } = useMemo(() => {
    return reviews.reduce(
      (acc, review) => {
        if (review.isPublished) {
          acc.published.push(review);
        } else {
          acc.unpublished.push(review);
        }
        return acc;
      },
      { published: [], unpublished: [] }
    );
  }, [reviews]);

  const handleTogglePublish = (review) => {
    updateReview.mutate({ id: review.id, isPublished: !review.isPublished });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás segura de que quieres eliminar esta reseña?")) {
      deleteReview.mutate(id);
    }
  };

  const isMutationPending = updateReview.isPending || deleteReview.isPending;

  return (
    <div className={styles.reviewsAdmin}>
      <h2>Administrar Reseñas</h2>
      <p>
        Aquí puedes ver todas las reseñas enviadas. Las reseñas nuevas no son
        públicas hasta que las apruebes.
      </p>

      <section className={styles.reviewSection}>
        <h3>Pendientes de Aprobación ({unpublished.length})</h3>
        <div className={styles.reviewsList}>
          {unpublished.length === 0 ? (
            <p>No hay reseñas pendientes.</p>
          ) : (
            unpublished.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onToggle={handleTogglePublish}
                onDelete={handleDelete}
                isPending={isMutationPending}
              />
            ))
          )}
        </div>
      </section>

      <section className={styles.reviewSection}>
        <h3>Reseñas Publicadas ({published.length})</h3>
        <div className={styles.reviewsList}>
          {published.length === 0 ? (
            <p>No hay reseñas publicadas.</p>
          ) : (
            published.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onToggle={handleTogglePublish}
                onDelete={handleDelete}
                isPending={isMutationPending}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
