import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../styles/Faq.module.css";
import { HiChevronDown } from "react-icons/hi";

const faqData = [
  {
    question: "¿Cómo puedo reservar mi lugar en un viaje?",
    answer:
      "¡Es muy fácil! Simplemente contáctanos por WhatsApp para confirmar la disponibilidad. Para asegurar tu lugar, se requiere un pago de anticipo que se especifica en la página de cada viaje.",
  },
  {
    question: "Voy a viajar sola, ¿es seguro?",
    answer:
      "¡Absolutamente! De hecho, muchas de nuestras viajeras vienen solas. Fomentamos un ambiente de comunidad y respeto donde todas se sienten seguras y acompañadas. Teresa, la fundadora, está presente en cada viaje para coordinar y cuidar al grupo.",
  },
  {
    question: "¿Qué tipo de mujeres viajan con Viajeras por Siempre?",
    answer:
      "Nuestra comunidad está formada por mujeres, en su mayoría de 50 años en adelante, que comparten el amor por descubrir México. Son mujeres curiosas, respetuosas y con ganas de vivir nuevas experiencias y hacer nuevas amigas.",
  },
  {
    question: "¿Cuál es el ritmo de los viajes?",
    answer:
      "Nuestros itinerarios están diseñados para disfrutarse sin prisas. Valoramos la comodidad y el tiempo para explorar, tomar fotos y simplemente disfrutar del momento. No son viajes de 'maratón'.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Por el momento aceptamos pagos mediante transferencia bancaria y en efectivo. Estamos trabajando para habilitar otras formas de pago y hacer el proceso mas conveniente para ti.",
  },
  {
    question: "¿Qué pasa si necesito cancelar mi viaje?",
    answer:
      "El anticipo para la reservación no es reembolsable, ya que se utiliza para asegurar lugares con nuestros proveedores. Para más detalles, por favor consulta nuestros Términos y Condiciones.",
  },
];

export const Route = createFileRoute("/preguntas-frecuentes")({
  component: FaqComponent,
});

function FaqComponent() {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles["page-title"]}>Preguntas Frecuentes</h1>
      <p className={styles["page-subtitle"]}>
        Aquí respondemos algunas de las dudas más comunes. Si no encuentras lo
        que buscas, no dudes en contactarnos.
      </p>
      <section className={styles.accordion}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.accordionItem}>
            <button
              onClick={() => handleToggle(index)}
              className={styles.accordionQuestion}
            >
              <span>{item.question}</span>
              <HiChevronDown
                className={`${styles.chevron} ${openItem === index ? styles.open : ""}`}
              />
            </button>
            <div
              className={`${styles.accordionAnswer} ${openItem === index ? styles.open : ""}`}
            >
              <div className={styles.accordionInner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className={styles.ctaSection}>
        <h2>¿Tienes más preguntas?</h2>
        <p>
          Estamos aquí para ayudarte. Contáctanos directamente y con gusto
          resolveremos todas tus dudas para que viajes con total tranquilidad.
        </p>
        <Link to="/contacto" className={styles["cta-button"]}>
          Contactar Ahora
        </Link>
      </section>
    </main>
  );
}
