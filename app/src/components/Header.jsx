import { useState } from "react";
import { Link } from "@tanstack/react-router";
import styles from "../styles/Header.module.css";
import { HiMenu, HiX } from "react-icons/hi";

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <span>Nehnemi</span>
    </Link>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isViajesDropdownOpen, setIsViajesDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsViajesDropdownOpen(false);
  };

  return (
    <header className={styles["main-header"]}>
      <Logo />

      <nav>
        <ul
          className={`${styles["nav-links"]} ${isMenuOpen ? styles["menu-open"] : ""}`}
        >
          <li
            className={styles.dropdown}
            onMouseEnter={() => setIsViajesDropdownOpen(true)}
            onMouseLeave={() => setIsViajesDropdownOpen(false)}
          >
            <button
              className={styles["dropdown-toggle"]}
              onClick={() => setIsViajesDropdownOpen(!isViajesDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={isViajesDropdownOpen}
            >
              Viajes
            </button>
            <ul
              className={`${styles["dropdown-menu"]} ${isViajesDropdownOpen ? styles["dropdown-open"] : ""}`}
            >
              <li>
                <Link to="/viajes/" onClick={closeAllMenus}>
                  Todos
                </Link>
              </li>
              <li>
                <Link to="/viajes/proximos" onClick={closeAllMenus}>
                  Próximos Viajes
                </Link>
              </li>
              <li>
                <Link to="/viajes/pasados" onClick={closeAllMenus}>
                  Viajes Pasados
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/nosotros" onClick={closeAllMenus}>
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/galeria" onClick={closeAllMenus}>
              Galería
            </Link>
          </li>
          <li>
            <Link to="/preguntas-frecuentes" onClick={closeAllMenus}>
              Preguntas Frecuentes
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={closeAllMenus}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>

      <button
        onClick={toggleMenu}
        className={styles["menu-toggle"]}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>
    </header>
  );
}

export default Header;
