import zacatlan_01 from "../assets/zacatlan_01.jpg";
import xochimilco from "../assets/julieta-julieta-bwwOu1GOXnk-unsplash.jpg";
import cuetzalan from "../assets/jesus-santos-d9P6T0Podwc-unsplash.jpg";
import queretaro from "../assets/daniel-uribarren-CSYOVRSJ1mY-unsplash.jpg";
import mariposas from "../assets/alex-guillaume-16oqzpFRMqs-unsplash.jpg";
import barrancas from "../assets/alan-lara-AYZgVDjzM40-unsplash.jpg";
import tolantongo from "../assets/marie-volkert-BiJXgdQvtBw-unsplash.jpg";

const proximosViajes = [
  {
    id: "zacatlan",
    destination: "Zacatlán de las Manzanas y Chignahuapan",
    date: "11 al 13 de Noviembre, 2025",
    price: "$2,600 MXN",
    imageSrc: zacatlan_01,
  },
  {
    id: "xochimilco",
    destination: "Mercados Tradicionales de Xochimilco",
    date: "3 de Diciembre, 2025",
    price: "$500 MXN",
    imageSrc: xochimilco,
  },
  {
    id: "cuetzalan",
    destination: "Cuetzalan, Pueblo Mágico y sus Cascadas",
    date: "20 al 22 de Enero, 2026",
    price: "$3,000 MXN",
    imageSrc: cuetzalan,
  },
];

const viajesPasados = [
  {
    id: 1,
    destination: "Ruta del Vino, Querétaro",
    imageSrc: queretaro,
  },
  {
    id: 2,
    destination: "Santuario de la Mariposa Monarca",
    imageSrc: mariposas,
  },
  {
    id: 3,
    destination: "Barrancas del Cobre",
    imageSrc: barrancas,
  },
  {
    id: 4,
    destination: "Grutas de Tolantongo",
    imageSrc: tolantongo,
  },
];

export { proximosViajes, viajesPasados };
