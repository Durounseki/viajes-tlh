import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TripForm from "../../../../components/TripForm";
import { trips } from "../../../../data/viajes-data";

export const Route = createFileRoute("/admin/viajes/$viajeId/editar")({
  loader: ({ params }) => {
    console.log("Loading trip with ID:", params.viajeId);
    const trip = trips.find((t) => t.id === params.viajeId);
    if (!trip) {
      throw new Error("Trip not found!");
    }
    console.log(trip);
    return trip;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const trip = Route.useLoaderData();

  const handleUpdateTrip = async (formData, isDraft) => {
    const dataToSubmit = {
      ...formData,
      status: isDraft ? "DRAFT" : "PUBLISHED",
      price: parseInt(formData.price, 10) || 0,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      includedItems: {
        set: formData.includedItems.map((id) => ({ id })),
      },
    };

    console.log(
      `UPDATING trip ${trip.id}:`,
      JSON.stringify(dataToSubmit, null, 2)
    );

    alert("Viaje actualizado con éxito (simulación).");
    navigate({ to: "/admin/viajes" });
  };
  return (
    <TripForm onSubmit={handleUpdateTrip} initialData={trip} isEditing={true} />
  );
}
