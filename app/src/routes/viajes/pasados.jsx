import { createFileRoute } from "@tanstack/react-router";
import TripsLayout from "../../components/TripsLayout";
import { useMemo } from "react";
import { tripsQueryOptions, useTrips } from "../../data/trips";
import TripsPendingComponent from "../../components/TripsPendingComponent";

export const Route = createFileRoute("/viajes/pasados")({
  component: RouteComponent,
  pendingComponent: TripsPendingComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await queryClient.ensureQueryData(tripsQueryOptions);
    return {};
  },
});

function RouteComponent() {
  const { data: trips = [] } = useTrips();
  const pastTrips = useMemo(() => {
    const now = new Date();
    const past = trips
      .filter((trip) => new Date(trip.endDate) < now)
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    return past;
  }, [trips]);

  return (
    <TripsLayout
      title="Archivo de Viajes Pasados"
      subtitle="Nuestra historia se cuenta a través de los lugares que hemos visitado y las sonrisas que hemos compartido. Explora nuestro archivo de aventuras para inspirarte y ver la magia de viajar con Viajeras por Siempre."
      trips={pastTrips}
      ctaTitle="¿Te gustó alguno de nuestros destinos?"
      ctaSubtitle="Muchos de nuestros viajes más queridos se repiten. Si te interesa una aventura que ya concluyó, ¡dinos cuál! Nos ayuda a planificar las próximas salidas y podemos avisarte si lo volvemos a agendar."
      ctaText="Preguntar por un Viaje"
    />
  );
}
