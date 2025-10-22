import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TripForm from "../../../components/TripForm";
import { paymentPlansQueryOptions } from "../../../data/paymentPlans";
import { includedItemsQueryOptions } from "../../../data/includedItems";

export const Route = createFileRoute("/admin/viajes/nuevo")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await Promise.all([
      queryClient.ensureQueryData(paymentPlansQueryOptions),
      queryClient.ensureQueryData(includedItemsQueryOptions),
    ]);
    return {};
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const handleCreateTrip = async (
    formData,
    isDraft,
    newImagePayload,
    imagesToRemove
  ) => {
    let dataToSubmit;
    if (isDraft) {
      dataToSubmit = {
        ...formData,
        status: "DRAFT",
        price: parseInt(formData.price, 10) || 0,
        startDate: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : null,
        endDate: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : null,
      };
    } else {
      dataToSubmit = {
        ...formData,
        status: "PUBLISHED",
        price: parseInt(formData.price, 10) || 0,
        startDate: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : null,
        endDate: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : null,
        includedItems: {
          connect: formData.includedItems.map((id) => ({ id })),
        },
        images: {
          create: newImagePayload,
        },
      };
      if (dataToSubmit.images.create.length === 0) {
        delete dataToSubmit.images;
      }
    }
    console.log("CREATING new trip:", JSON.stringify(dataToSubmit, null, 2));
    try {
      const response = await fetch(`/api/viajes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });
      if (!response.ok) {
        throw new Error("Error creating event");
      }
      const responseData = await response.json();
      if (isDraft) {
        alert("Borrador guardado con éxito.");
        navigate({
          to: "/admin/viajes/$viajeId/editar",
          params: { viajeId: responseData.id },
        });
      } else {
        alert("Viaje publicado.");
        navigate({ to: "/admin/viajes" });
      }
      return responseData;
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("No se pudo guardar el viaje. Intentalo de nuevo.");
    }
  };

  return <TripForm onSubmit={handleCreateTrip} isEditing={false} />;
}
