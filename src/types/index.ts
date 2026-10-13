export type ApartmentStatus =
  | 'Disponible'
  | 'Separado'
  | 'Vendido'
  | 'Últimas unidades'
  | 'En preventa';

export interface ApartmentUnit {
  id: string;
  unitNumber?: string; // e.g. "301"
  number?: string; // alias for unitNumber
  name?: string; // e.g. "Tipo A - Studio Premium"
  floor?: number; // e.g. 3
  floorRange?: string; // e.g. "Pisos 3 al 6"
  type?: string; // e.g. "Tipo A"
  area: number; // in m²
  bedrooms: number;
  bathrooms: number;
  parkingSpots?: number;
  parking?: number; // alias
  priceCop: number;
  price?: number; // alias
  formattedPrice: string;
  status: ApartmentStatus;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  gallery?: string[];
  images?: string[]; // alias for gallery
  orientation?: string;
}

export type Apartment = ApartmentUnit;

export interface Amenity {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Todos' | 'Fachada & Lobby' | 'Interiores' | 'Exteriores';
  tag: string;
  image: string;
  description: string;
}

export type AdvisorStatus = 'Activo' | 'Inactivo';

export interface Advisor {
  id: string;
  name: string;
  role: string; // "Especialista en proyectos residenciales" | "Asesor comercial" | "Especialista en inversión inmobiliaria"
  specialty?: string; // alias for role
  avatar?: string;
  photo?: string; // alias for avatar
  status?: AdvisorStatus; // 'Activo' | 'Inactivo'
  initials?: string;
  languages?: string | string[];
  availability?: string;
  phoneDisplay: string;
  phone?: string; // alias for phoneDisplay
  whatsappNumber: string;
  email: string;
  bio?: string;
}

export interface LocationPoint {
  title: string;
  category: string;
  timeEst: string;
  description: string;
}

export type SeparationStatus = 'Pendiente' | 'En validación' | 'Aprobada' | 'Rechazada';

export interface SeparationRequest {
  id?: string;
  code: string;
  apartment: ApartmentUnit;
  apartmentUnitNumber?: string;
  advisor: Advisor;
  advisorName?: string;
  applicantName: string;
  applicantLastName: string;
  applicantIdNumber: string;
  applicantPhone: string;
  applicantEmail: string;
  applicantCity: string;
  purchaseTimeline: string;
  date: string;
  createdAt?: string;
  status?: SeparationStatus;
  notes?: string;
}

export type LeadStatus = 'Nuevo' | 'Contactado' | 'En seguimiento' | 'Cerrado';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  apartment: string; // e.g. "Apartamento 701"
  apartmentId?: string;
  advisor: string; // e.g. "Laura Gómez"
  advisorId?: string;
  message: string;
  purchaseTimeline: string;
  createdAt: string;
  status: LeadStatus;
}

export interface ContactInquiry {
  apartment?: ApartmentUnit;
  advisor?: Advisor;
  applicantName: string;
  applicantLastName: string;
  applicantPhone: string;
  applicantEmail: string;
  purchaseTimeline: string;
  message: string;
}

