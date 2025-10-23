import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TripForm from "../../../components/TripForm";
import { paymentPlansQueryOptions } from "../../../data/paymentPlans";
import { includedItemsQueryOptions } from "../../../data/includedItems";
import { useCreateTrip } from "../../../data/trips";

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
  const createTripMutation = useCreateTrip();
  const handleCreateTrip = async (
    formData,
    isDraft,
    newImagePayload,
    imagesToRemove
  ) => {
    const dataToSubmit = {
      ...formData,
      status: isDraft ? "DRAFT" : "PUBLISHED",
      price: parseInt(formData.price, 10) || null,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      paymentPlan: formData.paymentPlan
        ? {
            connect: {
              id: formData.paymentPlan,
            },
          }
        : undefined,
      includedItems: {
        connect: formData.includedItems.map((id) => ({ id })),
      },
      images: {
        create: newImagePayload,
      },
    };
    delete dataToSubmit.paymentPlanId;
    if (
      !dataToSubmit.includedItems.connect ||
      dataToSubmit.includedItems.connect.length === 0
    ) {
      delete dataToSubmit.includedItems;
    }
    if (
      !dataToSubmit.images.create.length ||
      dataToSubmit.images.create.length === 0
    ) {
      delete dataToSubmit.images;
    }
    createTripMutation.mutate(dataToSubmit, {
      onSuccess: (responseData) => {
        if (isDraft) {
          alert("Borrador guardado con éxito.");
          navigate({
            to: "/admin/viajes/$viajeId/editar",
            params: { viajeId: responseData.id },
          });
        } else {
          alert("Viaje publicado.");
          navigate({
            to: "/viajes/$viajeId",
            params: { viajeId: responseData.id },
          });
        }
      },
      onError: (error) => {
        alert("No se pudo guardar el viaje:", error.message);
      },
    });
  };

  return (
    <TripForm
      onSubmit={handleCreateTrip}
      isPending={createTripMutation.isPending}
      isEditing={false}
    />
  );
}
