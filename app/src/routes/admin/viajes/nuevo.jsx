import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TripForm from "../../../components/TripForm";

export const Route = createFileRoute("/admin/viajes/nuevo")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handleCreateTrip = async (formData, isDraft) => {
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
      includedItems: { connect: formData.includedItems.map((id) => ({ id })) },
    };

    console.log("CREATING new trip:", JSON.stringify(dataToSubmit, null, 2));

    alert("Viaje creado con éxito (simulación).");
    navigate({ to: "/admin/viajes" });
  };

  return <TripForm onSubmit={handleCreateTrip} isEditing={false} />;
}
