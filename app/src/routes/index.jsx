import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "../assets/miranda-garside-Ux2le0HiXwE-unsplash.jpg";
import { trips, testimonials } from "../data/viajes-data";
import styles from "../styles/Home.module.css";

import { formatTripDate } from "../utils/tripDate";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const now = new Date();
  const upcomingTrips = trips
    .filter((trip) => new Date(trip.endDate) >= now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const pastTrips = trips
    .filter((trip) => new Date(trip.endDate) < now)
    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  const featuredTrip =
    upcomingTrips.length > 0 ? upcomingTrips[0] : pastTrips[0];
  const nextTrips = upcomingTrips.slice(1);

  return (
    <main>
      <figure className={styles["hero-image"]}>
        <img src={heroImage} alt="San Miguel de Ayende" />
        <figcaption className={styles["overlay-caption"]}>
          <h1 className={styles["brand-name"]}>NEHNEMI</h1>
          <p className={styles["brand-meaning"]}>Del Náhuatl: "Viajar"</p>
        </figcaption>
      </figure>

      <section className={styles["hero-section"]}>
        <div className={styles["hero-content"]}>
          <h2>Nehnemi: Viajar entre amigas.</h2>
          <p>
            Creamos experiencias inolvidables pensadas para nosotras. Viaja a tu
            propio ritmo, siéntete segura y acompañada, y regresa a casa con
            nuevos recuerdos y nuevas amigas.
          </p>
          <Link to="/viajes" className={styles["cta-button"]}>
            Únete al Próximo Grupo
          </Link>
        </div>
      </section>

      <section className={styles["about-snippet"]}>
        <h2>Una Viajera Apasionada, como Tú</h2>
        <p>
          Nehnemi nació de una convicción: la aventura no tiene edad y la mejor
          forma de vivirla es en buena compañía. Soy Teresa, fundadora de
          Nehnemi y, ante todo, una viajera apasionada.
        </p>
        <p>
          Durante años, organicé viajes para mi círculo cercano, siempre con la
          idea de crear un ambiente donde todas nos sintiéramos cómodas, seguras
          y libres para disfrutar. Hoy, esa es la promesa de Nehnemi: ofrecerte
          viajes perfectamente planeados para que tú solo te ocupes de vivir el
          momento. Aquí no eres una turista, eres una compañera de aventura.
          ¡Bienvenida!
        </p>
        <Link to="/nosotros" className={styles["secondary-button"]}>
          Conoce más sobre Nehnemi
        </Link>
      </section>

      <section className={styles["upcoming-trip-section"]}>
        <h2>Nuestro Próximo Destino</h2>
        <div className={styles["trip-card"]}>
          <img
            src={featuredTrip.images[featuredTrip.thumbnailIndex]}
            alt={`Viaje a ${featuredTrip.destination}`}
          />
          <div className={styles["trip-card-content"]}>
            <h3>{featuredTrip.destination}</h3>
            <p className={styles["trip-details"]}>
              📅 {formatTripDate(featuredTrip.startDate, featuredTrip.endDate)}{" "}
              <br />
              💲 {featuredTrip.price} por persona
            </p>
            <Link
              to={`/viajes/${featuredTrip.id}`}
              className={styles["cta-button"]}
            >
              Ver Detalles del Viaje
            </Link>
          </div>
        </div>
      </section>

      {nextTrips.length > 0 && (
        <section className={styles["other-trips-section"]}>
          <h2>Más Aventuras Próximamente</h2>
          <div className={styles["other-trips-list"]}>
            {nextTrips.map((trip) => (
              <Link
                to={`/viajes/${trip.id}`}
                key={trip.id}
                className={styles["small-trip-card"]}
              >
                <img
                  src={trip.images[trip.thumbnailIndex]}
                  alt={`Viaje a ${trip.destination}`}
                />
                <div className={styles["price-tag"]}>{trip.price}</div>
                <div className={styles["small-trip-card-content"]}>
                  <h3>{trip.destination}</h3>
                  <p>{formatTripDate(trip.startDate, trip.endDate)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles["past-trips-section"]}>
        <h2>Aventuras Pasadas</h2>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={"auto"}
          centeredSlides={true}
          loop={true}
          className={styles["trip-carousel"]}
        >
          {pastTrips.map((trip) => (
            <SwiperSlide key={trip.id} className={styles["past-trip-slide"]}>
              <img
                src={trip.images[trip.thumbnailIndex]}
                alt={trip.destination}
              />
              <div className={styles["past-trip-overlay"]}>
                <p>{trip.destination}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to="/galeria" className={styles["secondary-button"]}>
          Ver Galería Completa
        </Link>
      </section>

      <section className={styles["testimonials-section"]}>
        <h2>Lo Que Dicen Nuestras Viajeras</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          className={styles["testimonial-carousel"]}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <blockquote className={styles["testimonial-quote"]}>
                "{testimonial.cita}"
              </blockquote>
              <p className={styles["testimonial-author"]}>
                - {testimonial.autora}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}
