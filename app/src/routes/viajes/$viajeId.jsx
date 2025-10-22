import { useState, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  tripsQueryOptions,
  useTrips,
  tripQueryOptions,
  useTrip,
} from "../../data/trips";
import {
  includedItemsQueryOptions,
  useIncludedItems,
} from "../../data/includedItems";
import { formatTripDate } from "../../utils/tripDate";

import styles from "../../styles/TripPage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiChevronDown } from "react-icons/hi";
import IncludesList from "../../components/IncludesList";
import TripCard from "../../components/TripCard";
import TripPendingComponent from "../../components/TripPendingComponent";

import PaymentPlan from "../../components/PaymentPlan";

export const Route = createFileRoute("/viajes/$viajeId")({
  loader: async ({ context, params }) => {
    const queryClient = context.queryClient;
    await Promise.all([
      queryClient.ensureQueryData(tripsQueryOptions),
      queryClient.ensureQueryData(tripQueryOptions(params.viajeId)),
      queryClient.ensureQueryData(includedItemsQueryOptions),
    ]);

    const trip = queryClient.getQueryData(
      tripQueryOptions(params.viajeId).queryKey
    );
    if (!trip) {
      throw notFound();
    }
    return {};
  },
  pendingComponent: TripPendingComponent,
  component: RouteComponent,
});

function RouteComponent() {
  const { viajeId } = Route.useParams();
  const { data: trip } = useTrip(viajeId);
  const { data: trips = [] } = useTrips();
  const { data: allItems = [] } = useIncludedItems();

  const [openItem, setOpenItem] = useState(null);

  const isPastTrip = new Date(trip.endDate) < new Date();

  const otherTrips = useMemo(() => {
    const now = new Date();
    return trips.filter((t) => t.id !== trip.id && new Date(t.endDate) >= now);
  }, [trips, trip.id]);

  const accordionData = [
    { title: "Cuándo", content: formatTripDate(trip.startDate, trip.endDate) },
    {
      title: "Itinerario",
      content: <p className={styles["preserve-lines"]}>{trip.itinerary}</p>,
    },
    {
      title: "Qué Incluye",
      content: (
        <IncludesList
          includedItems={trip.includedItems}
          allItems={allItems}
          notes={trip.notes}
          styles={styles}
        />
      ),
    },
    {
      title: "Formas de Pago",
      content: <PaymentPlan plan={trip.paymentPlan} />,
    },
    {
      title: "Recomendaciones",
      content: (
        <p className={styles["preserve-lines"]}>{trip.recommendations}</p>
      ),
    },
    {
      title: "Políticas",
      content: <p className={styles["preserve-lines"]}>{trip.policies}</p>,
    },
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
                src={`/api/images/${image.src}`}
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
            {otherTrips.slice(0, 3).map((otherTrip) => (
              <Link to={`/viajes/${otherTrip.id}`} key={otherTrip.id}>
                <TripCard trip={otherTrip} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
