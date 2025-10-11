// const proximosViajes = [
//   {
//     id: "zacatlan",
//     destination: "Zacatlán de las Manzanas y Chignahuapan",
//     date: "11 al 13 de Noviembre, 2025",
//     price: "$2,600 MXN",
//     imageSrc: zacatlan_01,
//   },
//   {
//     id: "xochimilco",
//     destination: "Mercados Tradicionales de Xochimilco",
//     date: "3 de Diciembre, 2025",
//     price: "$500 MXN",
//     imageSrc: xochimilco,
//   },
//   {
//     id: "cuetzalan",
//     destination: "Cuetzalan, Pueblo Mágico y sus Cascadas",
//     date: "20 al 22 de Enero, 2026",
//     price: "$3,000 MXN",
//     imageSrc: cuetzalan,
//   },
// ];

// const viajesPasados = [
//   {
//     id: 1,
//     destination: "Ruta del Vino, Querétaro",
//     imageSrc: queretaro,
//   },
//   {
//     id: 2,
//     destination: "Santuario de la Mariposa Monarca",
//     imageSrc: mariposas,
//   },
//   {
//     id: 3,
//     destination: "Barrancas del Cobre",
//     imageSrc: barrancas,
//   },
//   {
//     id: 4,
//     destination: "Grutas de Tolantongo",
//     imageSrc: tolantongo,
//   },
// ];

// export { proximosViajes, viajesPasados };
// src/data/trips.js

import zacatlan_01 from "../assets/zacatlan_01.jpg";
import zacatlan_02 from "../assets/zacatlan_02.jpg";
import zacatlan_03 from "../assets/zacatlan_03.jpg";
import xochimilco_01 from "../assets/julieta-julieta-bwwOu1GOXnk-unsplash.jpg";
import cuetzalan_01 from "../assets/jesus-santos-d9P6T0Podwc-unsplash.jpg";
import queretaro_01 from "../assets/daniel-uribarren-CSYOVRSJ1mY-unsplash.jpg";
import mariposas_01 from "../assets/alex-guillaume-16oqzpFRMqs-unsplash.jpg";
import barrancas_01 from "../assets/alan-lara-AYZgVDjzM40-unsplash.jpg";
import tolantongo_01 from "../assets/marie-volkert-BiJXgdQvtBw-unsplash.jpg";

export const trips = [
  {
    id: "zacatlan",
    destination: "Zacatlán de las Manzanas y Chignahuapan",
    startDate: "2025-11-11",
    endDate: "2025-11-13",
    price: "$2,600 MXN",
    images: [zacatlan_01, zacatlan_02, zacatlan_03],
    thumbnailIndex: 0,
    description:
      "Descubre la magia de Zacatlán, un Pueblo Mágico envuelto en niebla y famoso por sus relojes monumentales y su delicioso pan de queso. Exploraremos sus coloridas calles, visitaremos impresionantes cascadas y nos maravillaremos con la artesanía de las esferas en Chignahuapan.",
    itinerary: `Día 1: Salida de CDMX, llegada a Zacatlán, tour por el centro histórico y visita al mirador de cristal.\nDía 2: Excursión a las cascadas Tulimán y visita al valle de las piedras encimadas.\nDía 3: Tour en el pueblo de Chignahuapan, famoso por sus esferas navideñas, y regreso a CDMX.`,
    includes: {
      transporteRedondo: true,
      hospedaje: true,
      coordinadorViaje: true,
      entradas: true,
      seguroViajero: true,
      desayunoIncluido: false,
      notes:
        "No incluye alimentos ni bebidas no especificados. Las propinas son voluntarias.",
    },
    paymentMethods:
      "Anticipo de $1,000 MXN para reservar. Aceptamos transferencia bancaria y depósito.",
    recommendations:
      "Llevar ropa cómoda y abrigadora, zapatos para caminar, bloqueador solar y una chamarra impermeable.",
    policies:
      "El anticipo no es reembolsable. En caso de cancelación, se puede transferir el lugar a otra persona.",
  },
  {
    id: "xochimilco",
    destination: "Mercados Tradicionales de Xochimilco",
    startDate: "2025-12-03",
    endDate: "2025-12-03",
    price: "$500 MXN",
    images: [xochimilco_01],
    thumbnailIndex: 0,
    description:
      "Un día de color y tradición en los canales de Xochimilco. Visitamos el mercado de plantas y flores, y disfrutamos de un paseo en trajinera.",
    itinerary:
      "Visita al mercado de Madreselva, recorrido en trajinera por los canales y comida en el mercado local.",
    includes: {
      transporteRedondo: true,
      hospedaje: false,
      coordinadorViaje: true,
      entradas: false,
      seguroViajero: true,
      desayunoIncluido: false,
      notes: "Incluye el paseo en trajinera. No incluye alimentos.",
    },
    paymentMethods: "Pago completo para reservar.",
    recommendations:
      "Llevar sombrero o gorra, y dinero en efectivo para compras.",
    policies: "No hay reembolsos por cancelación.",
  },
  {
    id: "cuetzalan",
    destination: "Cuetzalan, Pueblo Mágico y sus Cascadas",
    startDate: "2026-01-20",
    endDate: "2026-01-22",
    price: "$3,000 MXN",
    images: [cuetzalan_01],
    thumbnailIndex: 0,
    description:
      "Sumérgete en la exuberante selva de la sierra poblana en Cuetzalan. Caminaremos por sus calles empedradas, exploraremos zonas arqueológicas y nos refrescaremos en sus impresionantes cascadas.",
    itinerary:
      "Día 1: Salida de CDMX y llegada a Cuetzalan.\nDía 2: Visita a la zona arqueológica de Yohualichan y cascada Las Brisas.\nDía 3: Mañana libre y regreso a CDMX.",
    includes: {
      transporteRedondo: true,
      hospedaje: true,
      coordinadorViaje: true,
      entradas: true,
      seguroViajero: true,
      desayunoIncluido: true,
      notes: "Incluye 2 desayunos en el hotel.",
    },
    paymentMethods: "Anticipo de $1,200 MXN para reservar.",
    recommendations:
      "Llevar repelente de mosquitos ecológico, impermeable y zapatos acuáticos.",
    policies: "El anticipo no es reembolsable.",
  },
  {
    id: "queretaro",
    destination: "Ruta del Vino y Queso, Querétaro",
    startDate: "2025-08-15",
    endDate: "2025-08-16",
    price: "$2,500 MXN",
    images: [queretaro_01],
    thumbnailIndex: 0,
    description:
      "Un viaje sensorial por los viñedos de Querétaro. Degustamos vinos locales, exploramos queserías artesanales y disfrutamos de los paisajes del semidesierto.",
    itinerary:
      "Visita a Viñedos La Redonda y Finca Sala Vivé. Degustación en la quesería Néole. Tarde libre en Tequisquiapan.",
    includes: {
      transporteRedondo: true,
      hospedaje: true,
      coordinadorViaje: true,
      entradas: true,
      seguroViajero: false,
      desayunoIncluido: true,
      notes: "Incluye degustaciones en viñedos y quesería.",
    },
    paymentMethods: "Anticipo de $800 MXN.",
    recommendations:
      "Llevar ropa fresca para el día y algo abrigador para la noche.",
    policies: "El anticipo no fue reembolsable.",
  },
  {
    id: "mariposas",
    destination: "Santuario de la Mariposa Monarca, Michoacán",
    startDate: "2025-02-22",
    endDate: "2025-02-23",
    price: "$2,200 MXN",
    images: [mariposas_01],
    thumbnailIndex: 0,
    description:
      "Una experiencia mágica presenciando uno de los espectáculos más impresionantes de la naturaleza: la hibernación de millones de mariposas Monarca en los bosques de Michoacán.",
    itinerary:
      "Día 1: Viaje al santuario y recorrido a caballo. Tarde en el Pueblo Mágico de Angangueo.\nDía 2: Mañana libre para comprar artesanías y regreso.",
    includes: {
      transporteRedondo: true,
      hospedaje: true,
      coordinadorViaje: true,
      entradas: true,
      seguroViajero: true,
      desayunoIncluido: true,
      notes:
        "El recorrido a caballo dentro del santuario tiene un costo adicional.",
    },
    paymentMethods: "Anticipo de $700 MXN.",
    recommendations:
      "Llevar ropa muy abrigadora en capas, guantes, gorro y botas de montaña.",
    policies: "El anticipo no fue reembolsable.",
  },
  {
    id: "barrancas",
    destination: "Aventura en las Barrancas del Cobre",
    startDate: "2025-03-10",
    endDate: "2025-03-14",
    price: "$8,500 MXN",
    images: [barrancas_01],
    thumbnailIndex: 0,
    description:
      "Un viaje espectacular a través del corazón de la Sierra Tarahumara a bordo del tren Chepe Express. Vistas impresionantes, cultura Rarámuri y una aventura inolvidable.",
    itinerary:
      "Recorrido en el Chepe Express desde Los Mochis hasta Creel, con paradas en El Fuerte, Bahuichivo y Divisadero. Visita al Parque de Aventura Barrancas del Cobre.",
    includes: {
      transporteRedondo: false,
      hospedaje: true,
      coordinadorViaje: true,
      entradas: false,
      seguroViajero: true,
      desayunoIncluido: false,
      notes:
        "No incluye boletos del tren Chepe Express ni vuelos a Los Mochis. Se requiere buena condición física.",
    },
    paymentMethods: "Se requiere un plan de pagos. Consultar detalles.",
    recommendations:
      "Reservar boletos de tren y vuelos con mucha anticipación. Llevar cámara y baterías extra.",
    policies: "Cancelaciones sujetas a las políticas del tren y hoteles.",
  },
  {
    id: "tolantongo",
    destination: "Paraíso en las Grutas de Tolantongo",
    startDate: "2025-05-20",
    endDate: "2025-05-21",
    price: "$2,100 MXN",
    images: [tolantongo_01],
    thumbnailIndex: 0,
    description:
      "Un escape relajante a las famosas aguas termales de Tolantongo. Disfrutamos de las pozas, el río de agua turquesa y las impresionantes grutas.",
    itinerary:
      "Día 1: Llegada a Tolantongo y día libre para disfrutar de las pozas y el río.\nDía 2: Exploración de la gruta y el túnel de vapor antes de regresar a CDMX.",
    includes: {
      transporteRedondo: true,
      hospedaje: true,
      coordinadorViaje: true,
      entradas: true,
      seguroViajero: true,
      desayunoIncluido: false,
      notes: "No incluye alimentos.",
    },
    paymentMethods: "Anticipo de $700 MXN.",
    recommendations:
      "Indispensable llevar traje de baño, toalla, y zapatos acuáticos. Se recomienda una funda contra agua para el celular.",
    policies: "El anticipo no fue reembolsable.",
  },
];

export const testimonials = [
  {
    id: 1,
    cita: "Fue mi primer viaje sola y me sentí segura y acompañada en todo momento. Teresa es una excelente anfitriona. ¡Ya quiero que sea el siguiente!",
    autora: "Laura G.",
  },
  {
    id: 2,
    cita: "Increíble organización y los lugares que visitamos fueron mágicos. Hice nuevas amigas y me traje recuerdos para toda la vida.",
    autora: "Carmen R.",
  },
  {
    id: 3,
    cita: "Recomiendo Nehnemi al 100%. Los viajes son cómodos, bien planeados y el ambiente del grupo es maravilloso.",
    autora: "Isabel M.",
  },
];
