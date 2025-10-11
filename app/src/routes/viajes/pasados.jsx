import { createFileRoute } from "@tanstack/react-router";
import { trips } from "../../data/viajes-data";
import TripsLayout from "../../components/TripsLayout";

export const Route = createFileRoute("/viajes/pasados")({
  component: RouteComponent,
});

function RouteComponent() {
  const now = new Date();
  const pastTrips = trips
    .filter((trip) => new Date(trip.endDate) < now)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <TripsLayout
      title="Archivo de Viajes Pasados"
      subtitle="Nuestra historia se cuenta a través de los lugares que hemos visitado y las sonrisas que hemos compartido. Explora nuestro archivo de aventuras para inspirarte y ver la magia de viajar con Nehnemi."
      trips={pastTrips}
      ctaTitle="¿Te gustó alguno de nuestros destinos?"
      ctaSubtitle="Muchos de nuestros viajes más queridos se repiten. Si te interesa una aventura que ya concluyó, ¡dinos cuál! Nos ayuda a planificar las próximas salidas y podemos avisarte si lo volvemos a agendar."
      ctaText="Preguntar por un Viaje"
    />
  );
}
