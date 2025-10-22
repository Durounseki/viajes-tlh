import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function IncludesList({ includedItems, allItems, notes, styles }) {
  const includedIds = new Set(includedItems.map((item) => item.id));

  return (
    <div className={styles.includesContent}>
      <ul className={styles.includesList}>
        {allItems.map((item) => (
          <li
            key={item.id}
            className={
              includedIds.has(item.id) ? styles.included : styles.notIncluded
            }
          >
            {includedIds.has(item.id) ? (
              <HiCheckCircle className={styles.includeIcon} />
            ) : (
              <HiXCircle className={styles.excludeIcon} />
            )}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      {notes && (
        <p className={styles.includeNotes}>
          <strong>Notas:</strong> {notes}
        </p>
      )}
    </div>
  );
}

export default IncludesList;
