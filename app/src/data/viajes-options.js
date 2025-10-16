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

export { initialItems, initialPlans };
