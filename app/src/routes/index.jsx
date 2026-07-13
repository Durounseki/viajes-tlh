import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "../assets/miranda-garside-Ux2le0HiXwE-unsplash.jpg";
import { tripsQueryOptions, useTrips } from "../data/trips";
import {
  publishedReviewsQueryOptions,
  usePublishedReviews,
} from "../data/reviews";
import styles from "../styles/Home.module.css";
import TripCard from "../components/TripCard";
import ProgressiveImage from "../components/ProgressiveImage";
import ReviewModal from "../components/ReviewModal";

import { formatTripDate } from "../utils/tripDate";
import { formatPrice } from "../utils/tripPrice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  meta: () => {
    return [
      { title: "Viajeras por Siempre | Viajes en Grupo para Mujeres en México" },
      { name: "description", content: "Descubre viajes en grupo para mujeres con Viajeras por Siempre. Experiencias inolvidables, seguras y en un ambiente de compañerismo." },
      { property: "og:title", content: "Viajeras por Siempre | Viajes en Grupo para Mujeres" },
      { property: "og:description", content: "Descubre viajes en grupo para mujeres con Viajeras por Siempre. Experiencias inolvidables, seguras y en un ambiente de compañerismo." }
    ];
  },
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    await Promise.all([
      queryClient.ensureQueryData(tripsQueryOptions),
      queryClient.ensureQueryData(publishedReviewsQueryOptions),
    ]);
    return {};
  },
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: trips = [] } = useTrips();
  const { data: reviews = [] } = usePublishedReviews();
  const { upcomingTrips, pastTrips } = useMemo(() => {
    const now = new Date();

    const upcoming = trips
      .filter((trip) => new Date(trip.endDate) >= now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    const past = trips
      .filter((trip) => new Date(trip.endDate) < now)
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    return { upcomingTrips: upcoming, pastTrips: past };
  }, [trips]);

  const featuredTrip = upcomingTrips.length > 0 ? upcomingTrips[0] : null;

  const nextTrips = upcomingTrips.slice(1);

  return (
    <main>
      <figure className={styles["hero-image"]}>
        <img src={heroImage} alt="San Miguel de Ayende" />
        <figcaption className={styles["overlay-caption"]}>
          <h1 className={styles["brand-name"]}>
            Viajeras
            <wbr /> por
            <wbr /> Siempre
          </h1>
        </figcaption>
      </figure>

      <section className={styles["hero-section"]}>
        <div className={styles["hero-content"]}>
          <h2>Viajeras por Siempre</h2>
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
          Viajeras por Siempre nació de una convicción: la aventura no tiene
          edad y la mejor forma de vivirla es en buena compañía. Soy Teresa,
          fundadora de Viajeras por Siempre y, ante todo, una viajera
          apasionada.
        </p>
        <p>
          Durante años, organicé viajes para mi círculo cercano, siempre con la
          idea de crear un ambiente donde todas nos sintiéramos cómodas, seguras
          y libres para disfrutar. Hoy, esa es la promesa de Viajeras por
          Siempre: ofrecerte viajes perfectamente planeados para que tú solo te
          ocupes de vivir el momento. Aquí no eres una turista, eres una
          compañera de aventura. ¡Bienvenida!
        </p>
        <Link to="/nosotros" className={styles["secondary-button"]}>
          Conoce más sobre Viajeras por Siempre
        </Link>
      </section>

      <section className={styles["upcoming-trip-section"]}>
        <h2>Nuestro Próximo Destino</h2>
        <div className={styles["trip-card"]}>
          {featuredTrip ? (
            <>
              <ProgressiveImage
                srcKey={featuredTrip.images[0].src}
                alt={`Viaje a ${featuredTrip.destination}`}
                className={styles.tripCardImage}
                sizes="(min-width: 900px) 300px,100vw"
              />
              <div className={styles["trip-card-content"]}>
                <h3>{featuredTrip.destination}</h3>
                <p className={styles["trip-details"]}>
                  📅{" "}
                  {formatTripDate(featuredTrip.startDate, featuredTrip.endDate)}{" "}
                  <br />
                  {formatPrice(featuredTrip.price)} por persona
                </p>
                <Link
                  to={`/viajes/${featuredTrip.slug || featuredTrip.id}`}
                  className={styles["cta-button"]}
                >
                  Ver Detalles del Viaje
                </Link>
              </div>
            </>
          ) : (
            <div className={styles["trip-card-content"]}>
              <h3>Próximamente</h3>
              <p>
                No hay viajes planeados por el momento. ¡Vuelve pronto para ver
                nuevas aventuras!
              </p>
            </div>
          )}
        </div>
      </section>

      {nextTrips.length > 0 && (
        <section className={styles["other-trips-section"]}>
          <h2>Más Aventuras Próximamente</h2>
          <div className={styles["other-trips-list"]}>
            {nextTrips.map((trip) => (
              <Link to={`/viajes/${trip.slug || trip.id}`} key={trip.id}>
                <TripCard trip={trip} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {pastTrips.length > 0 ? (
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
                <Link to={`/viajes/${trip.slug || trip.id}`}>
                  <ProgressiveImage
                    srcKey={trip.images[0].src}
                    alt={trip.destination}
                    className={styles.pastTripImage}
                    sizes="70vw"
                  />
                  <div className={styles["past-trip-overlay"]}>
                    <p>{trip.destination}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <Link to="/galeria" className={styles["secondary-button"]}>
            Ver Galería Completa
          </Link>
        </section>
      ) : null}

      <section className={styles["testimonials-section"]}>
        <h2>Lo Que Dicen Nuestras Viajeras</h2>
        {reviews.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            className={styles["testimonial-carousel"]}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <blockquote className={styles["testimonial-quote"]}>
                  "{review.quote}"
                </blockquote>
                <p className={styles["testimonial-author"]}>
                  - {review.author}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Aún no hay reseñas. ¡Sé la primera!</p>
        )}
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles["secondary-button"]}
          style={{ borderColor: "var(--color-primary)", marginTop: "2rem" }}
        >
          Deja tu Reseña
        </button>
      </section>
      {isModalOpen && <ReviewModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}
