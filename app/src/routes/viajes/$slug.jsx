import { useState, useMemo, useRef, useEffect } from "react";
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

export const Route = createFileRoute("/viajes/$slug")({
  loader: async ({ context, params }) => {
    const queryClient = context.queryClient;
    await Promise.all([
      queryClient.ensureQueryData(tripsQueryOptions),
      queryClient.ensureQueryData(tripQueryOptions(params.slug)),
      queryClient.ensureQueryData(includedItemsQueryOptions),
    ]);

    const trip = queryClient.getQueryData(
      tripQueryOptions(params.slug).queryKey
    );
    if (!trip) {
      throw notFound();
    }
    return { trip };
  },
  meta: ({ loaderData }) => {
    const trip = loaderData?.trip;
    if (!trip) {
      return [{ title: "Viaje no encontrado | Viajeras por Siempre" }];
    }
    const canonicalUrl = `https://viajerasporsiempre.com/viajes/${trip.slug || trip.id}`;
    return [
      { title: `${trip.destination} | Viajeras por Siempre` },
      { name: "description", content: trip.description || "" },
      { property: "og:title", content: `${trip.destination} | Viajeras por Siempre` },
      { property: "og:description", content: trip.description || "" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      {
        property: "og:image",
        content: trip.images?.[0]?.src
          ? `https://viajerasporsiempre.com/api/images/${trip.images[0].src}`
          : "https://viajerasporsiempre.com/social-share.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${trip.destination} | Viajeras por Siempre` },
      { name: "twitter:description", content: trip.description || "" }
    ];
  },
  pendingComponent: TripPendingComponent,
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const { data: trip } = useTrip(slug);
  const { data: trips = [] } = useTrips();
  const { data: allItems = [] } = useIncludedItems();

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const dialogRef = useRef(null);

  const jsonLd = useMemo(() => {
    if (!trip) return null;
    return {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": trip.destination,
      "description": trip.description || "",
      "touristType": "Group Travel / Open to Everyone",
      "offers": {
        "@type": "Offer",
        "price": trip.price || "",
        "priceCurrency": trip.currency || "MXN",
        "availability": "https://schema.org/InStock"
      }
    };
  }, [trip]);

  useEffect(() => {
    if (trip) {
      document.title = `${trip.destination} | Viajeras por Siempre`;
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) {
        descEl.setAttribute("content", trip.description || "");
      }
    }
  }, [trip]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedImageIndex !== null) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [selectedImageIndex]);

  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) {
      setSelectedImageIndex(null);
    }
  };

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

  const handleToggle = (event) => {
    if (event.currentTarget.open) {
      const detailsElement = event.currentTarget;
      setTimeout(() => {
        detailsElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  };

  return (
    <main className={styles.container}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
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
                onClick={() => setSelectedImageIndex(index)}
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
          <details
            key={index}
            name="trip-accordion"
            className={styles.accordionItem}
            onToggle={handleToggle}
          >
            <summary className={styles.accordionTitle}>
              <span>{item.title}</span>
              <HiChevronDown className={styles.chevron} />
            </summary>
            <div className={styles.accordionContent}>
              <div className={styles.accordionInner}>
                {item.title === "Reservar Ahora" ? (
                  <>
                    <p>{item.content}</p>
                    <a
                      href="https://wa.me/5215579008125"
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
          </details>
        ))}
      </section>

      {otherTrips.length > 0 && (
        <section className={styles.otherTripsSection}>
          <h2>Descubre Otros Destinos</h2>
          <div className={styles.otherTripsGrid}>
            {otherTrips.slice(0, 3).map((otherTrip) => (
              <Link to={`/viajes/${otherTrip.slug || otherTrip.id}`} key={otherTrip.id}>
                <TripCard trip={otherTrip} />
              </Link>
            ))}
          </div>
        </section>
      )}
      <dialog
        ref={dialogRef}
        onClose={() => setSelectedImageIndex(null)}
        onClick={handleDialogClick}
        className={styles.lightbox}
      >
        {selectedImageIndex !== null && (
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedImageIndex(null)}
              aria-label="Cerrar vista de imagen"
            >
              &times;
            </button>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              initialSlide={selectedImageIndex}
              loop={true}
              className={styles.lightboxCarousel}
            >
              {trip.images.map((image, index) => (
                <SwiperSlide
                  key={image.id}
                  className={styles.lightboxSlide}
                  onClick={() => setSelectedImageIndex(null)}
                >
                  <img
                    src={`/api/images/${image.src}`}
                    alt={image.alt || `${trip.destination} - imagen ${index + 1}`}
                    className={styles.lightboxImage}
                    onClick={(e) => e.stopPropagation()}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </dialog>
    </main>
  );
}
