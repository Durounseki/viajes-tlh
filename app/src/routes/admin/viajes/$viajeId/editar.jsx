import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import TripForm from "../../../../components/TripForm";
import { paymentPlansQueryOptions } from "../../../../data/paymentPlans";
import { includedItemsQueryOptions } from "../../../../data/includedItems";
import {
  tripQueryOptions,
  useTrip,
  useUpdateTrip,
} from "../../../../data/trips";

export const Route = createFileRoute("/admin/viajes/$viajeId/editar")({
  loader: async ({ context, params }) => {
    const tripId = params.viajeId;
    const queryClient = context.queryClient;
    await Promise.all([
      queryClient.ensureQueryData(tripQueryOptions(tripId)),
      queryClient.ensureQueryData(includedItemsQueryOptions),
      queryClient.ensureQueryData(paymentPlansQueryOptions),
    ]);

    const trip = queryClient.getQueryData(
      tripQueryOptions(params.viajeId).queryKey
    );
    if (!trip) {
      throw notFound();
    }
    return {};
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const tripId = Route.useParams().viajeId;
  const { data: trip = null } = useTrip(tripId);
  const updateTripMutation = useUpdateTrip();

  const handleUpdateTrip = async (
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
      includedItems: {
        set: formData.includedItems.map((id) => ({ id })),
      },
      paymentPlan: formData.paymentPlanId
        ? { connect: { id: formData.paymentPlanId } }
        : { disconnect: true },
      images: {
        create: newImagePayload,
        delete: imagesToRemove.map((id) => ({ id })),
      },
    };

    delete dataToSubmit.paymentPlanId;
    if (!dataToSubmit.images.create || dataToSubmit.images.create.length === 0)
      delete dataToSubmit.images.create;
    if (!dataToSubmit.images.delete || dataToSubmit.images.delete.length === 0)
      delete dataToSubmit.images.delete;
    if (Object.keys(dataToSubmit.images).length === 0)
      delete dataToSubmit.images;

    updateTripMutation.mutate(
      { tripData: dataToSubmit, tripId: trip.id },
      {
        onSuccess: (responseData) => {
          if (responseData.status === "DRAFT") alert("Borrador actualizado.");
          else {
            alert(
              trip.status === "DRAFT" ? "Viaje publicado." : "Viaje actualizado"
            );
            navigate({
              to: "/viajes/$viajeId",
              params: { viajeId: responseData.id },
            });
          }
        },
        onError: (error) => {
          alert(`No se pudo actualizar el viaje: ${error.message}`);
        },
      }
    );
  };
  return (
    <TripForm
      onSubmit={handleUpdateTrip}
      initialData={trip}
      isEditing={true}
      isPending={updateTripMutation.isPending}
    />
  );
}
