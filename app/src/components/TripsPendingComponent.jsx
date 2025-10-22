import styles from "../styles/Viajes.module.css";

function TripsPendingComponent() {
  return (
    <main className={styles["page-container"]}>
      <h1 className={styles["page-title"]}>Nuestras Aventuras</h1>
      <div className={styles["loading-container"]}>
        <p>Cargando viajes...</p>
      </div>
    </main>
  );
}

export default TripsPendingComponent;
