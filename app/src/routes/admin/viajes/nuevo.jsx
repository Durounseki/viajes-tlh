import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TripForm from "../../../components/TripForm";
import { paymentPlansQueryOptions } from "../../../data/paymentPlans";
import { includedItemsQueryOptions } from "../../../data/includedItems";

export const Route = createFileRoute("/admin/viajes/nuevo")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    console.log(queryClient);
    await Promise.all([
      queryClient.ensureQueryData(paymentPlansQueryOptions),
      queryClient.ensureQueryData(includedItemsQueryOptions),
    ]);
    console.log("data fetched");
    return {};
  },
});

function RouteComponent() {
  const handleCreateTrip = async (formData, isDraft) => {
    const includedItems = isDraft
      ? formData.includedItems
      : { connect: formData.includedItems.map((id) => ({ id })) };
    const data = {
      ...formData,
      status: isDraft ? "DRAFT" : "PUBLISHED",
      price: parseInt(formData.price, 10) || 0,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      includedItems: includedItems,
    };
    console.log("CREATING new trip:", JSON.stringify(data, null, 2));
    const response = await fetch(`/api/viajes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error creating event");
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  };

  return <TripForm onSubmit={handleCreateTrip} isEditing={false} />;
}
