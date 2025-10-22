import styles from "../styles/TripPage.module.css";

function PaymentPlan({ plan }) {
  if (!plan) {
    return <p>Consulta las opciones de pago.</p>;
  }

  return (
    <div>
      <strong>{plan.name}</strong>
      {plan.description && <p>{plan.description}</p>}
      <ul className={styles.paymentPlanList}>
        {plan.installments.map((inst) => (
          <li key={inst.id}>
            {inst.description}: <strong>{inst.percentage}%</strong>
            {inst.daysBeforeTrip > 0 && (
              <span> ({inst.daysBeforeTrip} días antes del viaje)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentPlan;
