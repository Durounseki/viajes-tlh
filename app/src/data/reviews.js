import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

export const publishedReviewsQueryOptions = queryOptions({
  queryKey: ["reviews", "published"],
  queryFn: async () => {
    const res = await fetch("/api/reviews/published");
    if (!res.ok) throw new Error("Failed to fetch published reviews");
    return await res.json();
  },
  staleTime: 1000 * 60 * 60,
});

export const allReviewsQueryOptions = queryOptions({
  queryKey: ["reviews", "all"],
  queryFn: async () => {
    const res = await fetch("/api/reviews");
    if (!res.ok) throw new Error("Failed to fetch all reviews");
    return await res.json();
  },
});

export const usePublishedReviews = () => {
  return useQuery(publishedReviewsQueryOptions);
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ author, quote }) => {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, quote }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit review");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", "all"] });
    },
  });
};

export const useAllReviews = () => {
  return useQuery(allReviewsQueryOptions);
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isPublished }) => {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update review");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", "all"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "published"] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete review");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", "all"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "published"] });
    },
  });
};
