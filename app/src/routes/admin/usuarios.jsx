import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../../styles/Admin.module.css";
import { users as allUsers } from "../../data/viajes-data.js";
import UserCard from "../../components/UserCard.jsx";
import { tripsQueryOptions, useTrips } from "../../data/trips.js";

export const Route = createFileRoute("/admin/usuarios")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await queryClient.ensureQueryData(tripsQueryOptions);
    return {};
  },
});

function RouteComponent() {
  const { data: trips = [] } = useTrips();
  const [users, setUsers] = useState(allUsers);
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!query) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);

  const handleToggleSubscription = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, isSuscribed: !user.isSuscribed } : user
      )
    );
    console.log(`Toggling subscription for user ${userId}`);
  };

  return (
    <div className={styles.usersPage}>
      <div className={styles.pageHeader}>
        <h3>Tus Clientes</h3>
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
            />
          ))
        ) : (
          <p>No se encontraron clientes con ese criterio.</p>
        )}
      </div>
    </div>
  );
}
