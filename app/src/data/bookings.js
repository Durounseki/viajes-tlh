import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchBookings = async () => {
  const response = await fetch("/api/bookings");
  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.status}`);
  }
  return response.json();
};

export const bookingsQueryOptions = {
  queryKey: ["bookings"],
  queryFn: fetchBookings,
};

export const useBookings = () => {
  return useQuery(bookingsQueryOptions);
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingInfo) => {
      const response = await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      });
      if (!response.ok) {
        throw new Error(`Error creating booking ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, tripId }) => {
      const response = await fetch(`/api/bookings/${userId}/${tripId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting booking ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paymentInfo) => {
      const response = await fetch(`/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo),
      });
      if (!response.ok) {
        throw new Error(`Error creating payment ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ paymentId, paymentInfo }) => {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo),
      });
      if (!response.ok) {
        throw new Error(`Error updating payment ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ paymentId }) => {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting payment ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
