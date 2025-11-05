import { Link } from "@tanstack/react-router";
import styles from "../styles/Footer.module.css";
import logo from "../assets/viajeras-x-siempre-dark.png";
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-content"]}>
        <div className={styles["footer-brand"]}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo Viajeras por Siempre" />
          </Link>
          <h3 className={styles["footer-logo-text"]}>Viajeras por Siempre</h3>
          <p>
            Creamos viajes para mujeres donde la seguridad, la comodidad y las
            buenas conversaciones son lo más importante.
          </p>
          <h4>Síguenos en la aventura:</h4>
          <div className={styles["social-icons"]}>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/5215579008125"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className={styles["footer-links"]}>
          <h4>Mapa del Sitio</h4>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/viajes">Próximos Viajes</Link>
            </li>
            <li>
              <Link to="/galeria">Galería</Link>
            </li>
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
            </li>
          </ul>
        </div>

        <div className={styles["footer-contact"]}>
          <h4>¿Hablamos?</h4>
          <p>
            ¿Lista para tu próxima aventura o tienes alguna duda? ¡Contáctanos!
          </p>
          <ul>
            <li>
              <FaWhatsapp /> <span>55 7900 8125</span>
            </li>
            <li>
              ✉️ <span>contacto@viajerasporsiempre.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <p>
          © {new Date().getFullYear()} Viajeras por Siempre. Todos los derechos
          reservados.
        </p>
        <p className={styles["legal-links"]}>
          <Link to="/terminos-y-condiciones">Términos y Condiciones</Link> |{" "}
          <Link to="/aviso-de-privacidad">Aviso de Privacidad</Link> |{" "}
          <Link to="/creditos">Créditos de Imágenes</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
