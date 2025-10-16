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
    price: 2600,
    currency: "MXN",
    description:
      "Descubre la magia de Zacatlán, un Pueblo Mágico envuelto en niebla y famoso por sus relojes monumentales y su delicioso pan de queso. Exploraremos sus coloridas calles, visitaremos impresionantes cascadas y nos maravillaremos con la artesanía de las esferas en Chignahuapan.",
    itinerary: `Día 1: Salida de CDMX, llegada a Zacatlán, tour por el centro histórico y visita al mirador de cristal.\nDía 2: Excursión a las cascadas Tulimán y visita al valle de las piedras encimadas.\nDía 3: Tour en el pueblo de Chignahuapan, famoso por sus esferas navideñas, y regreso a CDMX.`,
    recommendations:
      "Llevar ropa cómoda y abrigadora, zapatos para caminar, bloqueador solar y una chamarra impermeable.",
    policies:
      "El anticipo no es reembolsable. En caso de cancelación, se puede transferir el lugar a otra persona.",
    notes:
      "No incluye alimentos ni bebidas no especificados. Las propinas son voluntarias.",
    thumbnailId: "zacatlan_01",
    images: [
      { id: "zacatlan_01", src: zacatlan_01, alt: "zacatlan_01" },
      { id: "zacatlan_02", src: zacatlan_02, alt: zacatlan_03 },
      { id: "zacatlan_03", src: zacatlan_03, alt: "zacatlan_03" },
    ],

    includedItems: [
      { id: "item_transporte", name: "Transporte Redondo" },
      { id: "item_hospedaje", name: "Hospedaje" },
      { id: "item_coordinador", name: "Coordinador de Viaje" },
      { id: "item_entradas", name: "Entradas a sitios" },
      { id: "item_seguro", name: "Seguro de Viajero" },
    ],
    paymentPlanId:
      "Anticipo de $1,000 MXN para reservar. Aceptamos transferencia bancaria y depósito.",
  },
  {
    id: "xochimilco",
    destination: "Mercados Tradicionales de Xochimilco",
    startDate: "2025-12-03T09:00:00.000Z",
    endDate: "2025-12-03T18:00:00.000Z",
    price: 500,
    currency: "MXN",
    description:
      "Un día de color y tradición en los canales de Xochimilco. Visitamos el mercado de plantas y flores, y disfrutamos de un paseo en trajinera.",
    itinerary:
      "Visita al mercado de Madreselva, recorrido en trajinera por los canales y comida en el mercado local.",
    recommendations:
      "Llevar sombrero o gorra, y dinero en efectivo para compras.",
    policies: "No hay reembolsos por cancelación.",
    notes: "Incluye el paseo en trajinera. No incluye alimentos.",
    thumbnailId: "img_xoc_01",
    images: [
      {
        id: "img_xoc_01",
        src: xochimilco_01,
        alt: "Trajinera en los canales de Xochimilco",
      },
    ],
    includedItems: [
      { id: "item_transporte" },
      { id: "item_coordinador" },
      { id: "item_seguro" },
    ],
    paymentPlanId: "plan_pago_completo",
  },
  {
    id: "cuetzalan",
    destination: "Cuetzalan, Pueblo Mágico y sus Cascadas",
    startDate: "2026-01-20T07:00:00.000Z",
    endDate: "2026-01-22T21:00:00.000Z",
    price: 3000,
    currency: "MXN",
    description:
      "Sumérgete en la exuberante selva de la sierra poblana en Cuetzalan. Caminaremos por sus calles empedradas, exploraremos zonas arqueológicas y nos refrescaremos en sus impresionantes cascadas.",
    itinerary:
      "Día 1: Salida de CDMX y llegada a Cuetzalan.\nDía 2: Visita a la zona arqueológica de Yohualichan y cascada Las Brisas.\nDía 3: Mañana libre y regreso a CDMX.",
    recommendations:
      "Llevar repelente de mosquitos ecológico, impermeable y zapatos acuáticos.",
    policies: "El anticipo no es reembolsable.",
    notes: "Incluye 2 desayunos en el hotel.",
    thumbnailId: "img_cue_01",
    images: [
      {
        id: "img_cue_01",
        src: cuetzalan_01,
        alt: "Iglesia de Cuetzalan entre la niebla",
      },
    ],
    includedItems: [
      { id: "item_transporte" },
      { id: "item_hospedaje" },
      { id: "item_coordinador" },
      { id: "item_entradas" },
      { id: "item_seguro" },
      { id: "item_desayuno" },
    ],
    paymentPlanId: "plan_anticipo_1200",
  },
  {
    id: "queretaro",
    destination: "Ruta del Vino y Queso, Querétaro",
    startDate: "2025-08-15T07:00:00.000Z",
    endDate: "2025-08-16T21:00:00.000Z",
    price: 2500,
    currency: "MXN",
    description:
      "Un viaje sensorial por los viñedos de Querétaro. Degustamos vinos locales, exploramos queserías artesanales y disfrutamos de los paisajes del semidesierto.",
    itinerary:
      "Visita a Viñedos La Redonda y Finca Sala Vivé. Degustación en la quesería Néole. Tarde libre en Tequisquiapan.",
    recommendations:
      "Llevar ropa fresca para el día y algo abrigador para la noche.",
    policies: "El anticipo no fue reembolsable.",
    notes: "Incluye degustaciones en viñedos y quesería.",
    thumbnailId: "img_que_01",
    images: [
      { id: "img_que_01", src: queretaro_01, alt: "Viñedos en Querétaro" },
    ],
    includedItems: [
      { id: "item_transporte" },
      { id: "item_hospedaje" },
      { id: "item_coordinador" },
      { id: "item_entradas" },
      { id: "item_desayuno" },
    ],
    paymentPlanId: "plan_anticipo_800",
  },
  {
    id: "mariposas",
    destination: "Santuario de la Mariposa Monarca, Michoacán",
    startDate: "2026-02-22T07:00:00.000Z",
    endDate: "2026-02-23T21:00:00.000Z",
    price: 2200,
    currency: "MXN",
    description:
      "Una experiencia mágica presenciando uno de los espectáculos más impresionantes de la naturaleza: la hibernación de millones de mariposas Monarca en los bosques de Michoacán.",
    itinerary:
      "Día 1: Viaje al santuario y recorrido a caballo. Tarde en el Pueblo Mágico de Angangueo.\nDía 2: Mañana libre para comprar artesanías y regreso.",
    recommendations:
      "Llevar ropa muy abrigadora en capas, guantes, gorro y botas de montaña.",
    policies: "El anticipo no es reembolsable.",
    notes:
      "El recorrido a caballo dentro del santuario tiene un costo adicional.",
    thumbnailId: "img_mar_01",
    images: [
      {
        id: "img_mar_01",
        src: mariposas_01,
        alt: "Mariposas Monarca en un árbol",
      },
    ],
    includedItems: [
      { id: "item_transporte" },
      { id: "item_hospedaje" },
      { id: "item_coordinador" },
      { id: "item_entradas" },
      { id: "item_seguro" },
      { id: "item_desayuno" },
    ],
    paymentPlanId: "plan_anticipo_700",
  },
  {
    id: "barrancas",
    destination: "Aventura en las Barrancas del Cobre",
    startDate: "2026-03-10T07:00:00.000Z",
    endDate: "2026-03-14T21:00:00.000Z",
    price: 8500,
    currency: "MXN",
    description:
      "Un viaje espectacular a través del corazón de la Sierra Tarahumara a bordo del tren Chepe Express. Vistas impresionantes, cultura Rarámuri y una aventura inolvidable.",
    itinerary:
      "Recorrido en el Chepe Express desde Los Mochis hasta Creel, con paradas en El Fuerte, Bahuichivo y Divisadero. Visita al Parque de Aventura Barrancas del Cobre.",
    recommendations:
      "Reservar boletos de tren y vuelos con mucha anticipación. Llevar cámara y baterías extra.",
    policies: "Cancelaciones sujetas a las políticas del tren y hoteles.",
    notes:
      "No incluye boletos del tren Chepe Express ni vuelos a Los Mochis. Se requiere buena condición física.",
    thumbnailId: "img_bar_01",
    images: [
      {
        id: "img_bar_01",
        src: barrancas_01,
        alt: "Tren Chepe en las Barrancas del Cobre",
      },
    ],
    includedItems: [
      { id: "item_hospedaje" },
      { id: "item_coordinador" },
      { id: "item_seguro" },
    ],
    paymentPlanId: "plan_chepe",
  },
  {
    id: "tolantongo",
    destination: "Paraíso en las Grutas de Tolantongo",
    startDate: "2026-05-20T07:00:00.000Z",
    endDate: "2026-05-21T21:00:00.000Z",
    price: 2100,
    currency: "MXN",
    description:
      "Un escape relajante a las famosas aguas termales de Tolantongo. Disfrutamos de las pozas, el río de agua turquesa y las impresionantes grutas.",
    itinerary:
      "Día 1: Llegada a Tolantongo y día libre para disfrutar de las pozas y el río.\nDía 2: Exploración de la gruta y el túnel de vapor antes de regresar a CDMX.",
    recommendations:
      "Indispensable llevar traje de baño, toalla, y zapatos acuáticos. Se recomienda una funda contra agua para el celular.",
    policies: "El anticipo no fue reembolsable.",
    notes: "No incluye alimentos.",
    thumbnailId: "img_tol_01",
    images: [
      {
        id: "img_tol_01",
        src: tolantongo_01,
        alt: "Pozas de aguas termales en Tolantongo",
      },
    ],
    includedItems: [
      { id: "item_transporte" },
      { id: "item_hospedaje" },
      { id: "item_coordinador" },
      { id: "item_entradas" },
      { id: "item_seguro" },
    ],
    paymentPlanId: "plan_anticipo_700",
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
    cita: "Recomiendo Viajeras por Siempre al 100%. Los viajes son cómodos, bien planeados y el ambiente del grupo es maravilloso.",
    autora: "Isabel M.",
  },
];
