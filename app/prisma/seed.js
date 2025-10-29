import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.LOCAL_DATABASE_URL,
    },
  },
});

const initialItems = [
  { id: "item_transporte", name: "Transporte Redondo" },
  { id: "item_hospedaje", name: "Hospedaje" },
  { id: "item_coordinador", name: "Coordinador de Viaje" },
  { id: "item_entradas", name: "Entradas a sitios" },
  { id: "item_seguro", name: "Seguro de Viajero" },
  { id: "item_desayuno", name: "Desayuno Incluido" },
];

const initialPlans = [
  {
    id: "plan_pago_completo",
    name: "Pago Completo al Reservar",
    description: "Se requiere el 100% del pago para confirmar el lugar.",
    installments: [
      {
        id: "install_100",
        description: "Pago total",
        percentage: 100,
        daysBeforeTrip: 0,
      },
    ],
  },
  {
    id: "plan_anticipo_700",
    name: "Anticipo de $700",
    description: "Reserva con $700 y liquida el resto antes del viaje.",
    installments: [],
  },
  {
    id: "plan_anticipo_800",
    name: "Anticipo de $800",
    description: "Reserva con $800 y liquida el resto antes del viaje.",
    installments: [],
  },
  {
    id: "plan_anticipo_1000",
    name: "Anticipo de $1000",
    description: "Reserva con $1000 y liquida el resto antes del viaje.",
    installments: [],
  },
  {
    id: "plan_anticipo_1200",
    name: "Anticipo de $1200",
    description: "Reserva con $1200 y liquida el resto antes del viaje.",
    installments: [],
  },
  {
    id: "plan_chepe",
    name: "Plan Especial Chepe",
    description: "Plan de pagos personalizado para el viaje a Barrancas.",
    installments: [],
  },
];

const users = [
  {
    id: "user_1",
    name: "Laura García",
    email: "laura@email.com",
    phone: "5512345678",
  },
  {
    id: "user_2",
    name: "Carmen Rodríguez",
    email: "carmen@email.com",
    phone: "5587654321",
  },
  {
    id: "user_3",
    name: "Isabel Martínez",
    email: "isabel@email.com",
    phone: "5555555555",
  },
];

const trips = [
  {
    id: "zacatlan",
    destination: "Zacatlán de las Manzanas y Chignahuapan",
    status: "PUBLISHED",
    startDate: "2025-11-11T12:00:00Z",
    endDate: "2025-11-13T12:00:00Z",
    price: 2600,
    currency: "MXN",
    description: "Descubre la magia de Zacatlán...",
    itinerary: "Día 1: Salida de CDMX...",
    recommendations: "Llevar ropa cómoda y abrigadora...",
    policies: "El anticipo no es reembolsable...",
    notes: "No incluye alimentos ni bebidas...",
    thumbnailId: "zacatlan_01",
    images: [
      { id: "zacatlan_01", srcKey: "zacatlan_01.jpg", alt: "zacatlan_01" },
      { id: "zacatlan_02", srcKey: "zacatlan_02.jpg", alt: "zacatlan_02" },
      { id: "zacatlan_03", srcKey: "zacatlan_03.jpg", alt: "zacatlan_03" },
    ],
    includedItems: [
      { id: "item_transporte" },
      { id: "item_hospedaje" },
      { id: "item_coordinador" },
      { id: "item_entradas" },
      { id: "item_seguro" },
    ],
    paymentPlanId: "plan_anticipo_1000",
  },
  {
    id: "xochimilco",
    destination: "Mercados Tradicionales de Xochimilco",
    status: "PUBLISHED",
    startDate: "2025-12-03T09:00:00Z",
    endDate: "2025-12-03T18:00:00Z",
    price: 500,
    currency: "MXN",
    description: "Un día de color y tradición...",
    itinerary: "Visita al mercado de Madreselva...",
    recommendations: "Llevar sombrero o gorra...",
    policies: "No hay reembolsos por cancelación.",
    notes: "Incluye el paseo en trajinera...",
    thumbnailId: "img_xoc_01",
    images: [
      {
        id: "img_xoc_01",
        srcKey: "xochimilco_01.jpg",
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
    status: "PUBLISHED",
    startDate: "2026-01-20T07:00:00Z",
    endDate: "2026-01-22T21:00:00Z",
    price: 3000,
    currency: "MXN",
    description: "Sumérgete en la exuberante selva...",
    itinerary: "Día 1: Salida de CDMX...",
    recommendations: "Llevar repelente de mosquitos...",
    policies: "El anticipo no es reembolsable.",
    notes: "Incluye 2 desayunos en el hotel.",
    thumbnailId: "img_cue_01",
    images: [
      {
        id: "img_cue_01",
        srcKey: "cuetzalan_01.jpg",
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
    status: "PUBLISHED",
    startDate: "2025-08-15T07:00:00Z",
    endDate: "2025-08-16T21:00:00Z",
    price: 2500,
    currency: "MXN",
    description: "Un viaje sensorial por los viñedos...",
    itinerary: "Visita a Viñedos La Redonda...",
    recommendations: "Llevar ropa fresca...",
    policies: "El anticipo no fue reembolsable.",
    notes: "Incluye degustaciones...",
    thumbnailId: "img_que_01",
    images: [
      {
        id: "img_que_01",
        srcKey: "queretaro_01.jpg",
        alt: "Viñedos en Querétaro",
      },
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
    status: "PUBLISHED",
    startDate: "2026-02-22T07:00:00Z",
    endDate: "2026-02-23T21:00:00Z",
    price: 2200,
    currency: "MXN",
    description: "Una experiencia mágica...",
    itinerary: "Día 1: Viaje al santuario...",
    recommendations: "Llevar ropa muy abrigadora...",
    policies: "El anticipo no es reembolsable.",
    notes: "El recorrido a caballo...",
    thumbnailId: "img_mar_01",
    images: [
      {
        id: "img_mar_01",
        srcKey: "mariposas_01.jpg",
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
    status: "PUBLISHED",
    startDate: "2026-03-10T07:00:00Z",
    endDate: "2026-03-14T21:00:00Z",
    price: 8500,
    currency: "MXN",
    description: "Un viaje espectacular...",
    itinerary: "Recorrido en el Chepe Express...",
    recommendations: "Reservar boletos de tren...",
    policies: "Cancelaciones sujetas...",
    notes: "No incluye boletos del tren Chepe...",
    thumbnailId: "img_bar_01",
    images: [
      {
        id: "img_bar_01",
        srcKey: "barrancas_01.jpg",
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
    status: "PUBLISHED",
    startDate: "2026-05-20T07:00:00Z",
    endDate: "2026-05-21T21:00:00Z",
    price: 2100,
    currency: "MXN",
    description: "Un escape relajante...",
    itinerary: "Día 1: Llegada a Tolantongo...",
    recommendations: "Indispensable llevar traje de baño...",
    policies: "El anticipo no fue reembolsable.",
    notes: "No incluye alimentos.",
    thumbnailId: "img_tol_01",
    images: [
      {
        id: "img_tol_01",
        srcKey: "tolantongo_01.jpg",
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

const bookings = [
  {
    userId: "user_1",
    tripId: "zacatlan",
    bookingDate: "2025-09-15T10:00:00Z",
    payments: [
      {
        amount: 1000,
        paymentDate: "2025-09-15T10:00:00Z",
        method: "Transferencia",
      },
    ],
  },
  {
    userId: "user_2",
    tripId: "zacatlan",
    bookingDate: "2025-09-18T14:30:00Z",
    payments: [
      {
        amount: 2600,
        paymentDate: "2025-09-18T14:30:00Z",
        method: "Tarjeta",
      },
    ],
  },
  {
    userId: "user_3",
    tripId: "xochimilco",
    bookingDate: "2025-10-01T11:00:00Z",
    payments: [],
  },
];

async function main() {
  console.log("Start seeding ...");

  console.log("Cleaning database...");
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.user.deleteMany();
  await prisma.image.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.installment.deleteMany();
  await prisma.paymentPlan.deleteMany();
  await prisma.includedItem.deleteMany();

  console.log("Seeding IncludedItem...");
  await prisma.includedItem.createMany({
    data: initialItems,
  });

  console.log("Seeding PaymentPlan...");
  for (const plan of initialPlans) {
    await prisma.paymentPlan.create({
      data: {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        installments: {
          createMany: {
            data: plan.installments,
          },
        },
      },
    });
  }

  console.log("Seeding User...");
  await prisma.user.createMany({
    data: users,
  });

  console.log("Seeding Trip...");
  for (const trip of trips) {
    await prisma.trip.create({
      data: {
        id: trip.id,
        status: trip.status,
        destination: trip.destination,
        startDate: new Date(trip.startDate),
        endDate: new Date(trip.endDate),
        price: trip.price,
        currency: trip.currency,
        description: trip.description,
        itinerary: trip.itinerary,
        recommendations: trip.recommendations,
        policies: trip.policies,
        thumbnailId: trip.thumbnailId,
        notes: trip.notes,
        paymentPlan: {
          connect: { id: trip.paymentPlanId },
        },
        includedItems: {
          connect: trip.includedItems.map((item) => ({ id: item.id })),
        },
        images: {
          create: trip.images.map((img) => ({
            id: img.id,
            src: img.srcKey,
            alt: img.alt,
          })),
        },
      },
    });
  }

  console.log("Seeding Booking...");
  for (const booking of bookings) {
    await prisma.booking.create({
      data: {
        userId: booking.userId,
        tripId: booking.tripId,
        bookingDate: new Date(booking.bookingDate),
        payments: {
          create: booking.payments.map((p) => ({
            amount: p.amount,
            paymentDate: new Date(p.paymentDate),
            method: p.method,
            reference: p.reference,
          })),
        },
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
