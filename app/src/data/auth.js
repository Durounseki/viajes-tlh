import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const getCurrentUser = async () => {
  const res = await fetch("/api/auth");
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Not authenticated");
    }
    throw new Error("Failed to fetch user status");
  }
  const data = await res.json();
  return data.user;
};

export const authQueryOptions = queryOptions({
  queryKey: ["auth", "currentUser"],
  queryFn: getCurrentUser,
  retry: (failureCount, error) => {
    if (error.message === "Not authenticated") {
      return false;
    }
    return failureCount < 2;
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 15,
});

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Login failed");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "currentUser"] });
    },
  });
};

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth", "currentUser"], null);
      navigate({ to: "/login" });
    },
  });
};

const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({ oldPassword, newPassword }) => {
      const res = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to change password");
      }
      return await res.json();
    },
  });
};

const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ email }) => {
      const res = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Error submitting request.");
      }
      return await res.json();
    },
  });
};

const useResetPasswordConfirm = () => {
  return useMutation({
    mutationFn: async ({ token, newPassword }) => {
      const res = await fetch("/api/auth/password-reset-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to reset password");
      }
      return await res.json();
    },
  });
};

export const useAuth = () => {
  const { data: user, isLoading, isError } = useQuery(authQueryOptions);

  return {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
    isError,
    login: useLogin(),
    logout: useLogout(),
    changePassword: useChangePassword(),
    resetPassword: useResetPassword(),
    resetPasswordConfirm: useResetPasswordConfirm(),
  };
};
