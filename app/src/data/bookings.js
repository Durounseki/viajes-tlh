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
