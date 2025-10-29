import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("/api/users", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return response.json();
};

export const usersQueryOptions = {
  queryKey: ["users"],
  queryFn: fetchUsers,
};

export const useUsers = () => {
  return useQuery(usersQueryOptions);
};

const fetchUser = async (userId) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }
  return response.json();
};

export const userQueryOptions = (userId) => ({
  queryKey: ["users", userId],
  queryFn: () => fetchUser(userId),
});

export const useUser = (userId) => {
  return useQuery(userQueryOptions(userId));
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userInfo) => {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        throw new Error(`Error creating user ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables) => {
      const { userId, userInfo } = variables;
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        throw new Error(`Error updating user ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data, variables, context) => {
      const { userId } = variables;
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables) => {
      const { userId } = variables;
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting user ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data, variables, context) => {
      const { userId } = variables;
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
    },
  });
};
