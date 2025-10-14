import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/Legal.module.css";

export const Route = createFileRoute("/aviso-de-privacidad")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Aviso de Privacidad</h1>
      <p>
        <strong>Última actualización:</strong> 10 de Octubre, 2025
      </p>

      <p>
        En Viajeras por Siempre, con domicilio fiscal en [Dirección Fiscal de tu Mamá,
        Ciudad, Estado], estamos comprometidos con la protección de sus datos
        personales. El presente Aviso de Privacidad tiene como finalidad
        informarle sobre el tratamiento que se le da a su información.
      </p>

      <h2 className={styles.subtitle}>1. Datos Personales que Recabamos</h2>
      <p>
        Para llevar a cabo las finalidades descritas en este aviso, recabaremos
        los siguientes datos personales:
      </p>
      <ul>
        <li>
          <strong>Datos de Identificación:</strong> Nombre completo.
        </li>
        <li>
          <strong>Datos de Contacto:</strong> Correo electrónico, número de
          teléfono.
        </li>
        <li>
          <strong>Datos de Facturación:</strong> Domicilio fiscal, RFC (en caso
          de requerir factura).
        </li>
        <li>
          <strong>Datos Financieros:</strong> Información de pago para procesar
          las reservaciones (a través de procesadores de pago seguros).
        </li>
      </ul>

      <h2 className={styles.subtitle}>
        2. Finalidades del Tratamiento de sus Datos
      </h2>
      <p>
        Sus datos personales serán utilizados para las siguientes finalidades
        principales:
      </p>
      <ul>
        <li>Gestionar y procesar su reservación para nuestros viajes.</li>
        <li>
          Comunicarnos con usted sobre detalles del itinerario, pagos y
          logística del viaje.
        </li>
        <li>Proveerle los servicios y productos que ha solicitado.</li>
        <li>Emitir facturas y procesar pagos.</li>
        <li>Contactarlo para dar seguimiento a su experiencia de viaje.</li>
      </ul>
      <p>
        De manera adicional, podremos utilizar su información para enviarle
        promociones sobre futuros viajes y noticias de Viajeras por Siempre. Si no desea
        recibir estas comunicaciones, puede solicitarlo en cualquier momento.
      </p>

      <h2 className={styles.subtitle}>3. Transferencia de Datos Personales</h2>
      <p>
        Le informamos que sus datos personales podrán ser compartidos con
        terceros (hoteles, proveedores de transporte, guías locales) únicamente
        con el propósito de cumplir con los servicios del viaje que ha
        contratado. Estos terceros están obligados a mantener la
        confidencialidad de la información.
      </p>

      <h2 className={styles.subtitle}>4. Derechos ARCO</h2>
      <p>
        Usted tiene derecho a conocer qué datos personales tenemos de usted,
        para qué los utilizamos y las condiciones del uso que les damos
        (Acceso). Asimismo, es su derecho solicitar la corrección de su
        información personal (Rectificación); que la eliminemos de nuestros
        registros (Cancelación); así como oponerse al uso de sus datos
        personales para fines específicos (Oposición). Estos derechos se conocen
        como derechos ARCO.
      </p>
      <p>
        Para el ejercicio de cualquiera de los derechos ARCO, por favor envíe
        una solicitud al correo electrónico: <strong>hola@viajerasporsiempre.com</strong>.
      </p>

      <h2 className={styles.subtitle}>5. Cambios al Aviso de Privacidad</h2>
      <p>
        El presente aviso de privacidad puede sufrir modificaciones o
        actualizaciones. Nos comprometemos a mantenerlo informado sobre los
        cambios que pueda sufrir a través de nuestro sitio web.
      </p>

      <p>
        Al utilizar nuestros servicios, usted consiente el tratamiento de sus
        datos personales en los términos de este aviso.
      </p>
    </div>
  );
}
