import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/Contacto.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export const Route = createFileRoute("/contacto")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Quiero reservar un viaje",
    message: "",
    subscribe: true,
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const formContainerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setStatus("idle");
    setError(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Quiero reservar un viaje",
      message: "",
      subscribe: true,
    });
    formContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo."
        );
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Quiero reservar un viaje",
        message: "",
        subscribe: true,
      });
      formContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles["page-title"]}>Hablemos</h1>
      <p className={styles["page-subtitle"]}>
        ¿Tienes dudas o estás lista para tu próxima aventura? Llena el
        formulario o contáctanos directamente. ¡Nos encantará saber de ti!
      </p>

      <div className={styles["contact-grid"]}>
        <div className={styles["info-block"]}>
          <h3>Contacto Directo</h3>
          <p>Si prefieres una atención más personal, aquí nos encuentras:</p>
          <ul>
            <li>
              <a
                href="https://wa.me/5215500000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />{" "}
                <span>
                  <strong>WhatsApp:</strong> 55 1234 5678
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:contacto@viajerasporsiempre.com">
                <HiOutlineMail />{" "}
                <span>
                  <strong>Email:</strong> contacto@viajerasporsiempre.com
                </span>
              </a>
            </li>
          </ul>
          <p className={styles["response-time"]}>
            Normalmente respondemos en menos de 24 horas.
          </p>
        </div>

        <div className={styles["form-block"]} ref={formContainerRef}>
          {status === "success" ? (
            <div className={styles.successMessage}>
              <h3>¡Mensaje Enviado!</h3>
              <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
              <div className={styles.successActions}>
                <button onClick={resetForm} className={styles.secondaryButton}>
                  Enviar Otro Mensaje
                </button>
                <Link to="/" className={styles.primaryButton}>
                  Volver al Inicio
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Teléfono (Opcional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Asunto</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option>Quiero reservar un viaje</option>
                  <option>Tengo una pregunta sobre un viaje</option>
                  <option>Sugerir un nuevo destino</option>
                  <option>Otra consulta</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                />
                <label htmlFor="subscribe">
                  Quiero recibir noticias y promociones de futuros viajes.
                </label>
              </div>

              {status === "error" && (
                <p className={styles.errorMessage}>{error}</p>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
