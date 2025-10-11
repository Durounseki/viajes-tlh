import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../styles/Nosotros.module.css";
import teresaImage from "../assets/teresa.jpg";

export const Route = createFileRoute("/nosotros")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={styles["hero-text"]}>
          <h1>Una Aventura Hecha para Nosotras</h1>
          <p>
            Nehnemi es más que una agencia de viajes; es una comunidad de
            mujeres exploradoras, un espacio seguro para descubrir México y a
            nosotras mismas.
          </p>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h2>Nuestra Historia</h2>
            <p>
              Nehnemi nació de una convicción: la aventura no tiene edad y la
              mejor forma de vivirla es en buena compañía. Lo que comenzó hace
              años como viajes informales entre amigas, hoy se ha convertido en
              una misión: ofrecer experiencias auténticas, seguras y bien
              planeadas para todas.
            </p>
            <p>
              Somos un negocio familiar y ponemos el corazón en cada itinerario.
              Para nosotros, tu confianza es lo más importante. Por eso nos
              comprometemos a cuidar cada detalle, garantizando un viaje
              enriquecedor que siempre supere tus expectativas.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <img src={teresaImage} alt="Teresa, fundadora de Nehnemi" />
            <div className={styles.imageCaption}>
              <h3>Conoce a Teresa</h3>
              <p>
                "Ante todo, soy una viajera apasionada. Mi mayor alegría es ver
                el asombro y la felicidad en los rostros de mis compañeras de
                viaje al descubrir un nuevo rincón de nuestro México. En cada
                grupo, encuentro una nueva familia."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.philosophySection}>
        <h2>Nuestra Filosofía de Viaje</h2>
        <div className={styles.philosophyGrid}>
          <div className={styles.philosophyItem}>
            <h3>Seguridad Primero</h3>
            <p>
              Tu tranquilidad es nuestra prioridad. Elegimos rutas, transportes
              y hospedajes seguros para que solo te preocupes por disfrutar.
            </p>
          </div>
          <div className={styles.philosophyItem}>
            <h3>Comodidad y Ritmo</h3>
            <p>
              Viajamos sin prisas. Nuestros itinerarios están pensados para
              disfrutar cada lugar a un ritmo agradable, con comodidad y tiempo
              para todo.
            </p>
          </div>
          <div className={styles.philosophyItem}>
            <h3>Comunidad y Respeto</h3>
            <p>
              Fomentamos un ambiente de respeto y camaradería. Aquí no eres una
              turista, eres una compañera de aventura. Muchas regresan a casa
              con nuevas amigas.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>¿Lista para tu próxima aventura?</h2>
        <p>
          La historia continúa y queremos que seas parte de ella. Descubre los
          destinos que tenemos preparados y únete a nuestro siguiente grupo.
        </p>
        <Link to="/viajes/proximos" className={styles["cta-button"]}>
          Ver Próximos Viajes
        </Link>
      </section>
    </main>
  );
}
