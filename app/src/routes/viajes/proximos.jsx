import { createFileRoute } from "@tanstack/react-router";
import TripsLayout from "../../components/TripsLayout";
import { useMemo } from "react";
import { tripsQueryOptions, useTrips } from "../../data/trips";
import TripsPendingComponent from "../../components/TripsPendingComponent";

export const Route = createFileRoute("/viajes/proximos")({
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
  const upcomingTrips = useMemo(() => {
    const now = new Date();

    const upcoming = trips
      .filter((trip) => new Date(trip.endDate) >= now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return upcoming;
  }, [trips]);

  return (
    <TripsLayout
      title="Próximos Viajes"
      subtitle="¡La aventura te espera! Estos son los destinos que hemos preparado para
        ti. Explora los detalles, elige tu próximo viaje y prepárate para crear
        recuerdos inolvidables junto a nuevas amigas."
      trips={upcomingTrips}
      ctaTitle="¿No encontraste tu destino ideal?"
      ctaSubtitle="¡Tu opinión es muy importante! Queremos saber qué lugares de México te
          gustaría explorar. Tus sugerencias nos ayudan a crear las próximas
          aventuras de Viajeras por Siempre."
      ctaText="Enviar una Sugerencia"
    />
  );
}
