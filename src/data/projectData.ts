import { Apartment, Amenity, GalleryItem, Advisor, LocationPoint } from '../types';

import heroImg from '../assets/images/hero_altura72_building_1790205061769.jpg';
import lobbyImg from '../assets/images/lobby_altura72_1790205071874.jpg';
import livingImg from '../assets/images/living_altura72_1790205081673.jpg';
import kitchenImg from '../assets/images/kitchen_altura72_1790205090500.jpg';
import bedroomImg from '../assets/images/bedroom_altura72_1790205110887.jpg';
import poolImg from '../assets/images/pool_altura72_1790205099762.jpg';
import terraceImg from '../assets/images/terrace_altura72_1790205118414.jpg';

export const PROJECT_IMAGES = {
  hero: heroImg,
  lobby: lobbyImg,
  living: livingImg,
  kitchen: kitchenImg,
  bedroom: bedroomImg,
  pool: poolImg,
  terrace: terraceImg,
};

export const APARTMENTS_DATA: Apartment[] = [
  {
    id: 'tipo-a',
    name: 'Tipo A · Estudio Urbano',
    bedrooms: 1,
    bathrooms: 1.5,
    area: 58,
    priceCop: 420000000,
    formattedPrice: '$420.000.000 COP',
    status: 'Disponible',
    tagline: 'Luz natural, optimización espacial y terraza privada.',
    description:
      'Diseñado para quienes valoran la independencia y el confort en un entorno arquitectónico refinado. Integra sala-comedor diáfana con ventanales de piso a techo, cocina de concepto abierto con acabados en cuarzo y roble, y alcoba principal en suite con vestier.',
    features: [
      'Alcoba principal con baño privado y vestier',
      'Baño social independiente',
      'Cocina lineal con isla y encimera en cuarzo',
      'Balcón corrido con vista a la ciudad',
      'Zona de ropas oculta y depósito privado',
      '1 parqueadero privado en sótano'
    ],
    image: livingImg,
    floorRange: 'Pisos 4 al 12'
  },
  {
    id: 'tipo-b',
    name: 'Tipo B · Residencia Familiar',
    bedrooms: 2,
    bathrooms: 2.5,
    area: 92,
    priceCop: 640000000,
    formattedPrice: '$640.000.000 COP',
    status: 'Últimas unidades',
    tagline: 'Equilibrio perfecto entre vida social y privacidad.',
    description:
      'Una distribución generosa con ventilación cruzada continua. Ofrece dos habitaciones con baño propio, baño social para visitas, amplia sala de estar con salida directa a la terraza exterior y carpintería arquitectónica en tonos cálidos.',
    features: [
      '2 alcobas con baño privado cada una',
      'Alcoba principal con balcón frontal y walk-in closet',
      'Baño social de visitas',
      'Cocina abierta con península integrada al área social',
      'Balcón panorámico con baranda en cristal templado',
      '1 parqueadero privado + opción a segundo espacio'
    ],
    image: kitchenImg,
    floorRange: 'Pisos 5 al 18'
  },
  {
    id: 'tipo-c',
    name: 'Tipo C · Sky Residence',
    bedrooms: 3,
    bathrooms: 3.5,
    area: 138,
    priceCop: 980000000,
    formattedPrice: '$980.000.000 COP',
    status: 'En preventa',
    tagline: 'Amplitud extraordinaria, vistas panorámicas y doble terraza.',
    description:
      'La cúspide del confort contemporáneo en ALTURA 72. Cuenta con tres suites independientes, estar de alcobas / family room, cocina premium con despensa walk-in, y doble orientación lumínica que captura las brisas marinas de la costa cartagenera.',
    features: [
      '3 suites completas con baño privado',
      'Suite principal con vestier doble y baño con tina de inmersión',
      'Sala de estar o estudio familiar independiente',
      'Cocina gourmet con isla central y despensa',
      'Terraza principal de 24 m² con vista a la bahía',
      '2 parqueaderos cubiertos paralelos + depósito amplio'
    ],
    image: bedroomImg,
    floorRange: 'Pisos 14 al 24'
  }
];

export const AMENITIES_DATA: Amenity[] = [
  {
    id: 'piscina',
    name: 'Piscina',
    description:
      'Piscina infinita en el rooftop con espejo de agua sereno, deck en teca y borde panorámico con vista a la bahía de Cartagena.',
    category: 'Bienestar y Recreación',
    image: poolImg
  },
  {
    id: 'terraza-social',
    name: 'Terraza social',
    description:
      'Sky lounge exterior apergolado con áreas de descanso, chimenea ambiental y visuales despejadas hacia el atardecer.',
    category: 'Espacios Sociales',
    image: terraceImg
  },
  {
    id: 'gimnasio',
    name: 'Gimnasio',
    description:
      'Espacio de acondicionamiento físico dotado con tecnología de última generación, área de estiramiento y climatización central.',
    category: 'Salud y Movimiento'
  },
  {
    id: 'lobby',
    name: 'Lobby',
    description:
      'Ingreso monumental a doble altura revestido en piedra travertino, concierge 24/7 y sala de espera privada para residentes e invitados.',
    category: 'Bienvenida',
    image: lobbyImg
  },
  {
    id: 'zona-bbq',
    name: 'Zona BBQ',
    description:
      'Estación gourmet al aire libre equipada con parrilla profesional en acero, barra social y mobiliario para encuentros familiares.',
    category: 'Gastronomía'
  },
  {
    id: 'coworking',
    name: 'Coworking',
    description:
      'Salón de trabajo colaborativo y reuniones privadas con conectividad de alta velocidad, aislamiento acústico y luz natural.',
    category: 'Productividad'
  },
  {
    id: 'parqueaderos',
    name: 'Parqueaderos',
    description:
      'Sótano estructurado con accesos automatizados, bahías amplias para residentes, parqueadero de visitantes y puntos de recarga.',
    category: 'Infraestructura'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-fachada',
    title: 'Fachada Principal',
    category: 'Fachada & Lobby',
    tag: 'Fachada',
    image: heroImg,
    description: 'Volumetría sobria y contemporánea con voladizos verdes y cristales de alta eficiencia térmica.'
  },
  {
    id: 'gal-lobby',
    title: 'Lobby Doble Altura',
    category: 'Fachada & Lobby',
    tag: 'Lobby',
    image: lobbyImg,
    description: 'Piedra travertino natural, bronce arquitectónico y recepción con vigilancia permanente.'
  },
  {
    id: 'gal-apartamento',
    title: 'Área Social Apartamento',
    category: 'Interiores',
    tag: 'Apartamento',
    image: livingImg,
    description: 'Espacios fluidos donde la luz caribeña dialoga con texturas de lino y maderas selectas.'
  },
  {
    id: 'gal-cocina',
    title: 'Cocina de Autor',
    category: 'Interiores',
    tag: 'Cocina',
    image: kitchenImg,
    description: 'Isla en cuarzo pulido, carpintería alistonada y electrodomésticos perfectamente integrados.'
  },
  {
    id: 'gal-habitacion',
    title: 'Suite Principal',
    category: 'Interiores',
    tag: 'Habitación',
    image: bedroomImg,
    description: 'Un santuario de descanso privado con salida al balcón y sistema de iluminación indirecta.'
  },
  {
    id: 'gal-piscina',
    title: 'Piscina Infinity Rooftop',
    category: 'Exteriores',
    tag: 'Piscina',
    image: poolImg,
    description: 'Horizonte infinito sobre la bahía en el nivel más alto del edificio.'
  },
  {
    id: 'gal-terraza',
    title: 'Sky Lounge & Terraza',
    category: 'Exteriores',
    tag: 'Terraza',
    image: terraceImg,
    description: 'Salas de estar apergoladas diseñadas para contemplar el cielo cartagenero al atardecer.'
  }
];

export const LOCATION_POINTS: LocationPoint[] = [
  {
    title: 'Centro Histórico y Ciudad Amurallada',
    category: 'Cultura y Patrimonio',
    timeEst: '8 min',
    description: 'Acceso directo por avenidas principales al corazón cultural, galerías y alta gastronomía de Cartagena.'
  },
  {
    title: 'Bahía de Cartagena & Marinas',
    category: 'Náutica y Paseo',
    timeEst: '4 min',
    description: 'Cercanía inmediata a los principales muelles náuticos, clubes de vela y paseos peatonales.'
  },
  {
    title: 'Playas de Bocagrande & Castillogrande',
    category: 'Litoral',
    timeEst: '5 min',
    description: 'El circuito costero y senderos marítimos más valorados de la ciudad para ejercicio y recreación.'
  },
  {
    title: 'Aeropuerto Internacional Rafael Núñez',
    category: 'Conectividad',
    timeEst: '12 min',
    description: 'Rápida conexión terrestre con vuelos nacionales e internacionales sin congestión central.'
  }
];

export const ADVISORS_DATA: Advisor[] = [
  {
    id: 'adv-1',
    name: 'Mariana Salazar',
    role: 'Directora Comercial ALTURA 72',
    phoneDisplay: '+57 300 842 7200',
    whatsappNumber: '573008427200',
    email: 'mariana.salazar@altura72-ficticio.com',
    initials: 'MS',
    languages: 'Español / Inglés'
  },
  {
    id: 'adv-2',
    name: 'Carlos Andrés Méndez',
    role: 'Asesor Especialista en Inversiones',
    phoneDisplay: '+57 312 905 7201',
    whatsappNumber: '573129057201',
    email: 'carlos.mendez@altura72-ficticio.com',
    initials: 'CM',
    languages: 'Español'
  }
];
