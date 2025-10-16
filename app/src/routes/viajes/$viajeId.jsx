import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { trips } from "../../data/viajes-data";
import { initialPlans } from "../../data/viajes-options";
import { formatTripDate } from "../../utils/tripDate";

import styles from "../../styles/TripPage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiChevronDown } from "react-icons/hi";
import IncludesList from "../../components/IncludesList";
import { formatPrice } from "../../utils/tripPrice";

export const Route = createFileRoute("/viajes/$viajeId")({
  loader: async ({ params }) => {
    const trip = trips.find((t) => t.id === params.viajeId);
    if (!trip) {
      throw notFound();
    }
    console.log(trip);
    return trip;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const trip = Route.useLoaderData();

  const [openItem, setOpenItem] = useState(null);

  const isPastTrip = new Date(trip.endDate) < new Date();

  const otherTrips = trips.filter(
    (t) => t.id !== trip.id && new Date(t.endDate) >= new Date()
  );

  const paymentPlan = initialPlans.find((p) => p.id === trip.paymentPlanId);

  const accordionData = [
    { title: "Cuándo", content: formatTripDate(trip.startDate, trip.endDate) },
    { title: "Itinerario", content: trip.itinerary },
    {
      title: "Qué Incluye",
      content: (
        <IncludesList
          includedItems={trip.includedItems}
          notes={trip.notes}
          styles={styles}
        />
      ),
    },
    {
      title: "Formas de Pago",
      content: paymentPlan
        ? paymentPlan.description
        : "Consulta las opciones de pago",
    },
    { title: "Recomendaciones", content: trip.recommendations },
    { title: "Políticas", content: trip.policies },
  ];

  if (!isPastTrip) {
    accordionData.push({
      title: "Reservar Ahora",
      content: "¡Asegura tu lugar en esta increíble aventura!",
    });
  }

  const handleToggle = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <main className={styles.container}>
      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className={styles.tripCarousel}
        >
          {trip.images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <img
                src={image.src}
                alt={image.alt || `${trip.destination} - imagen ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {isPastTrip && (
          <div className={styles.concludedOverlay}>
            <span>Este Viaje ya Concluyó</span>
          </div>
        )}
      </div>

      <section className={styles.introSection}>
        <h1>{trip.destination}</h1>
        <p className={styles.tripDate}>
          {formatTripDate(trip.startDate, trip.endDate)}
        </p>
        <p className={styles.tripDescription}>{trip.description}</p>
      </section>

      <section className={styles.accordion}>
        {accordionData.map((item, index) => (
          <div key={index} className={styles.accordionItem}>
            <button
              onClick={() => handleToggle(index)}
              className={styles.accordionTitle}
            >
              <span>{item.title}</span>
              <HiChevronDown
                className={`${styles.chevron} ${openItem === index ? styles.open : ""}`}
              />
            </button>
            <div
              className={`${styles.accordionContent} ${openItem === index ? styles.open : ""}`}
            >
              <div className={styles.accordionInner}>
                {item.title === "Reservar Ahora" ? (
                  <>
                    <p>{item.content}</p>
                    <a
                      href="https://wa.me/5215500000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ctaButton}
                    >
                      Contactar por WhatsApp
                    </a>
                  </>
                ) : (
                  <div>{item.content}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {otherTrips.length > 0 && (
        <section className={styles.otherTripsSection}>
          <h2>Descubre Otros Destinos</h2>
          <div className={styles.otherTripsGrid}>
            {otherTrips.slice(0, 3).map((otherTrip) => {
              const thumbnail =
                otherTrip.images.find(
                  (img) => img.id === otherTrips.thumbnailId
                ) || otherTrip.images[0];
              const formattedPrice = formatPrice(
                otherTrip.price,
                otherTrip.currency
              );

              return (
                <Link
                  to={`/viajes/${otherTrip.id}`}
                  key={otherTrip.id}
                  className={styles.smallTripCard}
                >
                  <img
                    src={thumbnail.src}
                    alt={thumbnail.alt || otherTrip.destination}
                  />
                  <div className={styles.priceTag}>{formattedPrice}</div>
                  <div className={styles.smallTripCardContent}>
                    <h3>{otherTrip.destination}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
