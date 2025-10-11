function IncludesList({ includes, styles }) {
  const labels = {
    transporteRedondo: "Transporte Redondo",
    hospedaje: "Hospedaje",
    coordinadorViaje: "Coordinador de Viaje",
    entradas: "Entradas a sitios mencionados",
    seguroViajero: "Seguro de Viajero",
    desayunoIncluido: "Desayuno(s) Incluido(s)",
  };

  return (
    <div className={styles.includesContent}>
      <ul className={styles.includesList}>
        {Object.entries(includes).map(([key, value]) => {
          if (typeof value === "boolean" && labels[key]) {
            return (
              <li key={key} data-included={value}>
                {value ? "✅" : "❌"} {labels[key]}
              </li>
            );
          }
          return null;
        })}
      </ul>
      {includes.notes && (
        <p className={styles.includesNotes}>
          <strong>Notas:</strong> {includes.notes}
        </p>
      )}
    </div>
  );
}

export default IncludesList;
