import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchTrips = async () => {
  const response = await fetch(`/api/trips`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch trips: ${response.status}`);
  }
  return response.json();
};

export const tripsQueryOptions = {
  queryKey: ["trips"],
  queryFn: fetchTrips,
};
export const useTrips = () => {
  return useQuery(tripsQueryOptions);
};

const fetchTrip = async (tripId) => {
  const response = await fetch(`/api/trips/${tripId}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch trip: ${response.status}`);
  }
  return response.json();
};

export const tripQueryOptions = (tripId) => ({
  queryKey: ["trips", tripId],
  queryFn: () => fetchTrip(tripId),
});
export const useTrip = (tripId) => {
  return useQuery(tripQueryOptions(tripId));
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tripData) => {
      const response = await fetch(`/api/trips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });
      if (!response.ok) {
        throw new Error(`Error creating trip ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => {
      const { tripData, tripId } = variables;
      const response = await fetch(`/api/trips/${tripId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });
      if (!response.ok) {
        throw new Error(`Error updating trip ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data, variables, context) => {
      const { tripId } = variables;
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trips", tripId] });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tripId) => {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting trip ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data, variables, context) => {
      const { tripId } = variables;
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trips", tripId] });
    },
  });
};
