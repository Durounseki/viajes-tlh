import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/Legal.module.css";

export const Route = createFileRoute("/terminos-y-condiciones")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Términos y Condiciones</h1>
      <p>
        <strong>Última actualización:</strong> 10 de Octubre, 2025
      </p>

      <p>
        Bienvenida a Nehnemi. Al reservar un viaje o utilizar nuestro sitio web,
        usted acepta los siguientes términos y condiciones. Por favor, léalos
        con atención.
      </p>

      <h2 className={styles.subtitle}>1. Proceso de Reservación y Pago</h2>
      <p>
        Para reservar un lugar en cualquiera de nuestros viajes, se requiere un
        pago de anticipo (el monto será especificado en la página de cada
        viaje). El lugar no se considera confirmado hasta que dicho pago haya
        sido recibido. El resto del pago deberá ser liquidado en las fechas
        estipuladas para cada viaje. Aceptamos pagos mediante [Ej: Transferencia
        bancaria, depósito, enlace de pago con tarjeta].
      </p>

      <h2 className={styles.subtitle}>2. Política de Cancelación</h2>
      <ul>
        <li>
          <strong>Cancelación por parte del cliente:</strong> El anticipo de la
          reservación no es reembolsable en ninguna circunstancia, ya que se
          utiliza para garantizar lugares con nuestros proveedores. Si cancela
          con más de 30 días de anticipación a la fecha del viaje, se le
          reembolsará el 50% de los pagos adicionales al anticipo. Cancelaciones
          con menos de 30 días de anticipación no serán reembolsables.
        </li>
        <li>
          <strong>Cancelación por parte de Nehnemi:</strong> Si Nehnemi se ve en
          la necesidad de cancelar un viaje por no alcanzar el mínimo de
          participantes o por causas de fuerza mayor, se le notificará a la
          brevedad y se le ofrecerá un reembolso completo del 100% de lo pagado
          o un crédito para un futuro viaje.
        </li>
      </ul>

      <h2 className={styles.subtitle}>3. Responsabilidades de la Viajera</h2>
      <p>Es responsabilidad de cada viajera:</p>
      <ul>
        <li>
          Llegar puntualmente a los puntos de encuentro y horarios establecidos
          en el itinerario.
        </li>
        <li>
          Mantener una conducta respetuosa hacia las demás compañeras de viaje,
          guías y personal de servicio.
        </li>
        <li>
          Cuidar sus pertenencias personales. Nehnemi no se hace responsable por
          pérdidas o robos.
        </li>
        <li>
          Seguir las indicaciones de seguridad proporcionadas por los guías.
        </li>
      </ul>

      <h2 className={styles.subtitle}>4. Cambios en el Itinerario</h2>
      <p>
        Aunque nos esforzamos por seguir el itinerario publicado, Nehnemi se
        reserva el derecho de modificar rutas, horarios o actividades por causas
        de fuerza mayor, condiciones climáticas o cualquier otra situación que
        pudiera poner en riesgo la seguridad del grupo.
      </p>

      <h2 className={styles.subtitle}>5. Limitación de Responsabilidad</h2>
      <p>
        Nehnemi actúa como intermediario entre usted y los proveedores de
        servicios (hoteles, transporte, etc.). No nos hacemos responsables por
        actos, omisiones, negligencia o accidentes causados por dichos terceros.
      </p>

      <h2 className={styles.subtitle}>6. Aceptación de los Términos</h2>
      <p>
        El pago de la reservación de cualquiera de nuestros viajes constituye la
        aceptación total de estos términos y condiciones.
      </p>
    </div>
  );
}
