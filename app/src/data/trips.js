import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchTrips = async () => {
  const response = await fetch(`/api/viajes`, {
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
  const response = await fetch(`/api/viajes/${tripId}`, {
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
