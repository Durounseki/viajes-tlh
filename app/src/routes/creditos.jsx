import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/Creditos.module.css";

export const Route = createFileRoute("/creditos")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Agradecimientos</h1>
      <p className={styles.subtitle}>
        Este sitio web es el resultado del esfuerzo y la creatividad de muchas
        personas y proyectos. Queremos dar las gracias a todos los que lo
        hicieron posible.
      </p>

      <section className={styles.creditSection}>
        <h2>Diseño y Desarrollo Web</h2>
        <p>
          Diseñado y desarrollado con cariño por <strong>ELWeb</strong>. Una
          plataforma creada para conectar a viajeras con la magia de México.
        </p>
        <a
          href="https://www.esparzalopez.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.portfolioLink}
        >
          Ver mi trabajo
        </a>
      </section>

      <section className={styles.creditSection}>
        <h2>Fotografía</h2>
        <p>
          Las hermosas imágenes que dan vida a este sitio son gracias al talento
          de fotógrafos que comparten su trabajo en Unsplash.
        </p>
        <ul className={styles.creditList}>
          <li>
            Foto de portada por{" "}
            <a href="https://unsplash.com/@mjg_5?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Miranda Garside
            </a>{" "}
            en{" "}
            <a href="https://unsplash.com/photos/people-walking-on-street-near-buildings-during-daytime-Ux2le0HiXwE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
            .
          </li>
          <li>
            Foto de Xochimilco por{" "}
            <a href="https://unsplash.com/@julietajulieta?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Julieta Julieta
            </a>{" "}
            en{" "}
            <a href="https://unsplash.com/photos/painted-wall-lot-bwwOu1GOXnk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
            .
          </li>
          <li>
            Foto de Cuetzalan por{" "}
            <a href="https://unsplash.com/@jesussantosphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Jesus Santos
            </a>{" "}
            en{" "}
            <a href="https://unsplash.com/photos/a-view-of-a-city-from-a-high-point-of-view-8YY1O3zCy4s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
            .
          </li>
          <li>
            Foto de Querétaro por{" "}
            <a href="https://unsplash.com/@danieluribarren?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Daniel Uribarren
            </a>{" "}
            en{" "}
            <a href="https://unsplash.com/photos/a-row-of-stone-pillars-next-to-a-tree-CSYOVRSJ1mY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
            .
          </li>
          <li>
            Foto de Mariposas Monarca por{" "}
            <a href="https://unsplash.com/@alx2bgx?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Alex Guillaume
            </a>{" "}
            en{" "}
            <a href="https://unsplash.com/photos/orange-butterflies-16oqzpFRMqs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
            .
          </li>
          <li>
            Foto de Barrancas del Cobre por{" "}
            <a href="https://unsplash.com/@alambroso?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Alan Lara
            </a>{" "}
            en{" "}
            <a href="https://unsplash.com/photos/black-train-on-rail-tracks-during-daytime-AYZgVDjzM40?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
            .
          </li>
          <li>
            Foto de Grutas de Tolantongo por{" "}
            <a
              href="https://unsplash.com/@mariee"
              target="_blank"
              rel="noopener noreferrer"
            >
              Marie Volkert
            </a>
            .
          </li>
        </ul>
      </section>

      <section className={styles.creditSection}>
        <h2>Tecnología y Herramientas</h2>
        <p>
          Esta plataforma fue construida utilizando herramientas modernas y de
          código abierto. Agradecemos a las comunidades que mantienen estos
          increíbles proyectos.
        </p>
        <ul className={styles.creditList}>
          <li>
            Framework de Frontend:{" "}
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
          </li>
          <li>
            Enrutamiento:{" "}
            <a
              href="https://tanstack.com/router/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TanStack Router
            </a>
          </li>
          <li>
            Backend y Despliegue:{" "}
            <a
              href="https://workers.cloudflare.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare Workers & Pages
            </a>
          </li>
          <li>
            API Framework:{" "}
            <a
              href="https://hono.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hono
            </a>
          </li>
          <li>
            Carruseles:{" "}
            <a
              href="https://swiperjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Swiper.js
            </a>
          </li>
          <li>
            Iconos:{" "}
            <a
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Icons
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
