import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchPaymentPlans = async () => {
  const response = await fetch(`/api/payment-plans`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch payment plans: ${response.status}`);
  }
  return response.json();
};

export const paymentPlansQueryOptions = {
  queryKey: ["paymentPlans"],
  queryFn: fetchPaymentPlans,
};
export const usePaymentPlans = () => {
  return useQuery(paymentPlansQueryOptions);
};

export const useCreatePaymentPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (planData) => {
      const response = await fetch(`/api/payment-plans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planData),
      });
      if (!response.ok) {
        throw new Error(`Error creating payment plan ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentPlans"] });
    },
  });
};
