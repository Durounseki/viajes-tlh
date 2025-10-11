import { createFileRoute } from "@tanstack/react-router";
import { trips } from "../../data/viajes-data";
import TripsLayout from "../../components/TripsLayout";

export const Route = createFileRoute("/viajes/proximos")({
  component: RouteComponent,
});

function RouteComponent() {
  const now = new Date();
  const upcomingTrips = trips
    .filter((trip) => new Date(trip.endDate) >= now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

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
          aventuras de Nehnemi."
      ctaText="Enviar una Sugerencia"
    />
  );
}
