import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchIncludedItems = async () => {
  const response = await fetch(`/api/included-items`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch included items: ${response.status}`);
  }
  return response.json();
};

export const includedItemsQueryOptions = {
  queryKey: ["includedItems"],
  queryFn: fetchIncludedItems,
};

export const useIncludedItems = () => {
  return useQuery(includedItemsQueryOptions);
};

export const useCreateIncludedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemData) => {
      const response = await fetch(`/api/included-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      if (!response.ok) {
        throw new Error(`Error creating included item ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["includedItems"] });
    },
  });
};
