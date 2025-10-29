import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../../styles/Admin.module.css";
import {
  usersQueryOptions,
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../../data/users.js";
import { useDeleteBooking } from "../../data/bookings.js";
import UserCard from "../../components/UserCard.jsx";
import { tripsQueryOptions, useTrips } from "../../data/trips.js";

export const Route = createFileRoute("/admin/usuarios")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await Promise.all([
      queryClient.ensureQueryData(tripsQueryOptions),
      queryClient.ensureQueryData(usersQueryOptions),
    ]);
    return {};
  },
});

function RouteComponent() {
  const { data: users = [] } = useUsers();
  const { data: trips = [] } = useTrips();
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultNewUserState = {
    name: "",
    email: "",
    phone: "",
    isSuscribed: true,
  };
  const [newUserData, setNewUserData] = useState(defaultNewUserState);
  const [formErrors, setFormErrors] = useState({});
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const deleteBookingMutation = useDeleteBooking();

  const filteredUsers = useMemo(() => {
    if (!query) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);

  const handleToggleSubscription = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    updateUserMutation.mutate(
      { ...user, isSuscribed: !user.isSuscribed },
      {
        onError: (error) => {
          alert(`Error al actualizar: ${error.message}`);
        },
      }
    );
  };

  const handleModalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    const errors = {};
    if (!newUserData.name) errors.name = "El nombre es obligatorio.";
    if (!newUserData.email) errors.email = "El email es obligatorio.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    createUserMutation.mutate(newUserData, {
      onSuccess: () => {
        alert("Cliente registrado con éxito.");
        setIsModalOpen(false);
        setNewUserData(defaultNewUserState);
        setFormErrors({});
      },
      onError: (error) => {
        alert(`Error al registrar: ${error.message}`);
      },
    });
  };

  return (
    <div className={styles.usersPage}>
      <div className={styles.pageHeader}>
        <h3>Tus Clientes</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.primaryButton}
        >
          + Registrar Cliente
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.userList}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              trips={trips}
              onToggleSubscription={handleToggleSubscription}
              updateUserMutation={updateUserMutation}
              deleteUserMutation={deleteUserMutation}
              deleteBookingMutation={deleteBookingMutation}
            />
          ))
        ) : (
          <p>No se encontraron clientes con ese criterio.</p>
        )}
      </div>

      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Registrar Nuevo Cliente</h3>
            <form
              onSubmit={handleRegisterUser}
              className={styles.createUserForm}
            >
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUserData.name}
                  onChange={handleModalChange}
                />
                {formErrors.name && (
                  <p className={styles.errorMessage}>{formErrors.name}</p>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUserData.email}
                  onChange={handleModalChange}
                />
                {formErrors.email && (
                  <p className={styles.errorMessage}>{formErrors.email}</p>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Teléfono (Opcional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newUserData.phone}
                  onChange={handleModalChange}
                />
              </div>
              <div className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id="isSuscribed"
                  name="isSuscribed"
                  checked={newUserData.isSuscribed}
                  onChange={handleModalChange}
                />
                <label htmlFor="isSuscribed">
                  Suscribir a la lista de correos
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={createUserMutation.isPending}
                >
                  {createUserMutation.isPending ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
