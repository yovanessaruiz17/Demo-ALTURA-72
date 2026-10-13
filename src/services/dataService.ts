import {
  ApartmentUnit,
  ApartmentStatus,
  Advisor,
  AdvisorStatus,
  Lead,
  LeadStatus,
  SeparationRequest,
  SeparationStatus,
} from '../types';
import { BUILDING_APARTMENTS, ADVISORS_TEAM } from '../data/apartmentsData';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  APARTMENTS: 'altura72_apartments_v3',
  ADVISORS: 'altura72_advisors_v3',
  LEADS: 'altura72_leads_v3',
  SEPARATIONS: 'altura72_separations_v3',
};

// Initial realistic leads for Phase 3
const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Mariana Valenzuela',
    phone: '+57 310 458 9201',
    email: 'mariana.valenzuela@gmail.com',
    apartment: 'Apartamento 701',
    apartmentId: 'apt-701',
    advisor: 'Laura Gómez',
    advisorId: 'laura-gomez',
    message: 'Interesada en plan de pagos para entrega a 18 meses y opciones de parqueadero adicional.',
    purchaseTimeline: '1-3 meses',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'Nuevo',
  },
  {
    id: 'lead-2',
    name: 'Andrés Felipe Osorio',
    phone: '+57 320 892 1144',
    email: 'af.osorio@inversionescaribe.co',
    apartment: 'Apartamento 504',
    apartmentId: 'apt-504',
    advisor: 'Valentina Ruiz',
    advisorId: 'valentina-ruiz',
    message: 'Solicito proyecciones de renta turística / Airbnb en Castillogrande y retorno estimado.',
    purchaseTimeline: 'Inmediatamente',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    status: 'Contactado',
  },
  {
    id: 'lead-3',
    name: 'Carolina Echeverri',
    phone: '+57 301 776 5320',
    email: 'caro.echeverri@outlook.com',
    apartment: 'Apartamento 301',
    apartmentId: 'apt-301',
    advisor: 'Carlos Martínez',
    advisorId: 'carlos-martinez',
    message: 'Consulta sobre descuentos por pago de contado y visita al apartamento modelo el fin de semana.',
    purchaseTimeline: '3-6 meses',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'En seguimiento',
  },
  {
    id: 'lead-4',
    name: 'Guillermo Mendoza',
    phone: '+57 314 209 8811',
    email: 'gmendoza@arquitectosbogota.com',
    apartment: 'Apartamento 1001 (Penthouse)',
    apartmentId: 'apt-1001',
    advisor: 'Laura Gómez',
    advisorId: 'laura-gomez',
    message: 'Revisión de planos estructurales para modificación de acabados interiores.',
    purchaseTimeline: '1-3 meses',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'Cerrado',
  },
];

// Initial realistic separation requests
const INITIAL_SEPARATIONS: SeparationRequest[] = [
  {
    id: 'sep-1',
    code: 'ALT-701-8392',
    apartment: BUILDING_APARTMENTS.find((a) => a.unitNumber === '701') || BUILDING_APARTMENTS[0],
    apartmentUnitNumber: '701',
    advisor: ADVISORS_TEAM[0],
    advisorName: 'Laura Gómez',
    applicantName: 'Santiago',
    applicantLastName: 'Montoya Restrepo',
    applicantIdNumber: '1020485921',
    applicantPhone: '+57 300 482 9912',
    applicantEmail: 's.montoya@gruporio.com',
    applicantCity: 'Medellín',
    purchaseTimeline: '1-3 meses',
    date: new Date(Date.now() - 3600000 * 12).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'Pendiente',
    notes: 'Cliente pre-aprobado con Bancolombia. Separación con 10% inicial proyectada para este viernes.',
  },
  {
    id: 'sep-2',
    code: 'ALT-504-4120',
    apartment: BUILDING_APARTMENTS.find((a) => a.unitNumber === '504') || BUILDING_APARTMENTS[1],
    apartmentUnitNumber: '504',
    advisor: ADVISORS_TEAM[1],
    advisorName: 'Carlos Martínez',
    applicantName: 'Beatriz',
    applicantLastName: 'Salazar Gómez',
    applicantIdNumber: '52849102',
    applicantPhone: '+57 315 889 0041',
    applicantEmail: 'bsalazar@salazarabogados.co',
    applicantCity: 'Bogotá D.C.',
    purchaseTimeline: 'Inmediatamente',
    date: new Date(Date.now() - 3600000 * 48).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'Aprobada',
    notes: 'Consignación de separación recibida en fiducia. Minuta de promesa de compraventa en redacción.',
  },
];

type DataChangeCallback = () => void;
const listeners = new Set<DataChangeCallback>();

export const subscribeToDataChanges = (cb: DataChangeCallback): (() => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const notifyChange = () => {
  listeners.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error('Error executing data subscriber', e);
    }
  });
};

/* ---------------- APARTMENTS ---------------- */

export const getApartments = async (): Promise<ApartmentUnit[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('apartments').select('*').order('unit_number');
      if (!error && data && data.length > 0) {
        return data.map(mapDbToApartment);
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local store', e);
    }
  }

  const local = localStorage.getItem(STORAGE_KEYS.APARTMENTS);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error('Failed to parse cached apartments', e);
    }
  }

  // Seed default apartments
  localStorage.setItem(STORAGE_KEYS.APARTMENTS, JSON.stringify(BUILDING_APARTMENTS));
  return BUILDING_APARTMENTS;
};

export const saveApartment = async (apt: ApartmentUnit): Promise<ApartmentUnit> => {
  const current = await getApartments();
  const existingIdx = current.findIndex((a) => a.id === apt.id);
  let updatedList: ApartmentUnit[];

  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = apt;
  } else {
    updatedList = [apt, ...current];
  }

  localStorage.setItem(STORAGE_KEYS.APARTMENTS, JSON.stringify(updatedList));

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('apartments').upsert(mapApartmentToDb(apt));
    } catch (e) {
      console.warn('Supabase upsert failed', e);
    }
  }

  notifyChange();
  return apt;
};

export const updateApartmentStatus = async (
  id: string,
  status: ApartmentStatus
): Promise<void> => {
  const current = await getApartments();
  const target = current.find((a) => a.id === id);
  if (target) {
    target.status = status;
    await saveApartment(target);
  }
};

export const updateApartmentPrice = async (
  id: string,
  priceCop: number
): Promise<void> => {
  const current = await getApartments();
  const target = current.find((a) => a.id === id);
  if (target) {
    target.priceCop = priceCop;
    target.formattedPrice = `$${new Intl.NumberFormat('es-CO').format(priceCop)} COP`;
    await saveApartment(target);
  }
};

export const deleteApartment = async (id: string): Promise<void> => {
  const current = await getApartments();
  const updated = current.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.APARTMENTS, JSON.stringify(updated));

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('apartments').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete failed', e);
    }
  }

  notifyChange();
};

/* ---------------- ADVISORS ---------------- */

export const getAdvisors = async (): Promise<Advisor[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('advisors').select('*');
      if (!error && data && data.length > 0) {
        return data.map(mapDbToAdvisor);
      }
    } catch (e) {
      console.warn('Supabase advisors fetch failed', e);
    }
  }

  const local = localStorage.getItem(STORAGE_KEYS.ADVISORS);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error('Failed to parse cached advisors', e);
    }
  }

  const defaultWithStatus = ADVISORS_TEAM.map((adv) => ({
    ...adv,
    status: (adv.status || 'Activo') as AdvisorStatus,
    specialty: adv.role,
  }));
  localStorage.setItem(STORAGE_KEYS.ADVISORS, JSON.stringify(defaultWithStatus));
  return defaultWithStatus;
};

export const saveAdvisor = async (advisor: Advisor): Promise<Advisor> => {
  const current = await getAdvisors();
  const existingIdx = current.findIndex((a) => a.id === advisor.id);
  let updatedList: Advisor[];

  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = advisor;
  } else {
    updatedList = [...current, advisor];
  }

  localStorage.setItem(STORAGE_KEYS.ADVISORS, JSON.stringify(updatedList));

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('advisors').upsert(mapAdvisorToDb(advisor));
    } catch (e) {
      console.warn('Supabase advisor save failed', e);
    }
  }

  notifyChange();
  return advisor;
};

export const toggleAdvisorStatus = async (
  id: string,
  newStatus: AdvisorStatus
): Promise<void> => {
  const current = await getAdvisors();
  const target = current.find((a) => a.id === id);
  if (target) {
    target.status = newStatus;
    await saveAdvisor(target);
  }
};

/* ---------------- LEADS ---------------- */

export const getLeads = async (): Promise<Lead[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(mapDbToLead);
      }
    } catch (e) {
      console.warn('Supabase leads fetch failed', e);
    }
  }

  const local = localStorage.getItem(STORAGE_KEYS.LEADS);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error('Failed to parse cached leads', e);
    }
  }

  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
  return INITIAL_LEADS;
};

export const createLead = async (
  leadData: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }
): Promise<Lead> => {
  const newLead: Lead = {
    ...leadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: new Date().toISOString(),
    status: leadData.status || 'Nuevo',
  };

  const current = await getLeads();
  const updated = [newLead, ...current];
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('leads').insert(mapLeadToDb(newLead));
    } catch (e) {
      console.warn('Supabase lead create failed', e);
    }
  }

  notifyChange();
  return newLead;
};

export const updateLeadStatus = async (
  id: string,
  status: LeadStatus
): Promise<void> => {
  const current = await getLeads();
  const target = current.find((l) => l.id === id);
  if (target) {
    target.status = status;
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(current));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('leads').update({ status }).eq('id', id);
      } catch (e) {
        console.warn('Supabase lead update failed', e);
      }
    }

    notifyChange();
  }
};

/* ---------------- SEPARATIONS ---------------- */

export const getSeparations = async (): Promise<SeparationRequest[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('separations').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(mapDbToSeparation);
      }
    } catch (e) {
      console.warn('Supabase separations fetch failed', e);
    }
  }

  const local = localStorage.getItem(STORAGE_KEYS.SEPARATIONS);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error('Failed to parse cached separations', e);
    }
  }

  localStorage.setItem(STORAGE_KEYS.SEPARATIONS, JSON.stringify(INITIAL_SEPARATIONS));
  return INITIAL_SEPARATIONS;
};

export const createSeparation = async (
  sepData: SeparationRequest
): Promise<SeparationRequest> => {
  const newSep: SeparationRequest = {
    ...sepData,
    id: sepData.id || `sep-${Date.now()}`,
    status: sepData.status || 'Pendiente',
    createdAt: sepData.createdAt || new Date().toISOString(),
  };

  const current = await getSeparations();
  const updated = [newSep, ...current];
  localStorage.setItem(STORAGE_KEYS.SEPARATIONS, JSON.stringify(updated));

  // Automatically mark apartment as "Separado" in catalog
  if (sepData.apartment?.id) {
    await updateApartmentStatus(sepData.apartment.id, 'Separado');
  }

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('separations').insert(mapSeparationToDb(newSep));
    } catch (e) {
      console.warn('Supabase separation create failed', e);
    }
  }

  notifyChange();
  return newSep;
};

export const updateSeparationStatus = async (
  code: string,
  status: SeparationStatus
): Promise<void> => {
  const current = await getSeparations();
  const target = current.find((s) => s.code === code);
  if (target) {
    target.status = status;
    localStorage.setItem(STORAGE_KEYS.SEPARATIONS, JSON.stringify(current));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('separations').update({ status }).eq('code', code);
      } catch (e) {
        console.warn('Supabase separation update failed', e);
      }
    }

    notifyChange();
  }
};

/* ---------------- RESET / SEED FUNCTION ---------------- */

export const resetDataToDefaults = async (): Promise<void> => {
  localStorage.setItem(STORAGE_KEYS.APARTMENTS, JSON.stringify(BUILDING_APARTMENTS));
  localStorage.setItem(STORAGE_KEYS.ADVISORS, JSON.stringify(ADVISORS_TEAM));
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
  localStorage.setItem(STORAGE_KEYS.SEPARATIONS, JSON.stringify(INITIAL_SEPARATIONS));
  notifyChange();
};

/* ---------------- HELPERS / DB MAPPERS ---------------- */

function mapDbToApartment(row: any): ApartmentUnit {
  return {
    id: row.id,
    unitNumber: row.unit_number || row.number,
    floor: row.floor,
    type: row.type,
    area: row.area,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    parkingSpots: row.parking || row.parking_spots || 1,
    priceCop: Number(row.price_cop || row.price),
    formattedPrice: `$${new Intl.NumberFormat('es-CO').format(Number(row.price_cop || row.price))} COP`,
    status: row.status,
    tagline: row.tagline || '',
    description: row.description || '',
    features: Array.isArray(row.features) ? row.features : JSON.parse(row.features || '[]'),
    image: row.image || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : JSON.parse(row.gallery || '[]'),
    orientation: row.orientation || '',
  };
}

function mapApartmentToDb(apt: ApartmentUnit): any {
  return {
    id: apt.id,
    unit_number: apt.unitNumber,
    floor: apt.floor,
    type: apt.type,
    area: apt.area,
    bedrooms: apt.bedrooms,
    bathrooms: apt.bathrooms,
    parking: apt.parkingSpots,
    price_cop: apt.priceCop,
    status: apt.status,
    tagline: apt.tagline,
    description: apt.description,
    features: apt.features,
    image: apt.image,
    gallery: apt.gallery || [],
    orientation: apt.orientation,
  };
}

function mapDbToAdvisor(row: any): Advisor {
  return {
    id: row.id,
    name: row.name,
    role: row.role || row.specialty,
    specialty: row.specialty || row.role,
    avatar: row.avatar || row.photo,
    photo: row.photo || row.avatar,
    status: row.status || 'Activo',
    availability: row.availability,
    phoneDisplay: row.phone_display || row.phone,
    whatsappNumber: row.whatsapp_number,
    email: row.email,
    bio: row.bio,
  };
}

function mapAdvisorToDb(adv: Advisor): any {
  return {
    id: adv.id,
    name: adv.name,
    role: adv.role,
    specialty: adv.role,
    avatar: adv.avatar,
    status: adv.status || 'Activo',
    availability: adv.availability,
    phone_display: adv.phoneDisplay,
    whatsapp_number: adv.whatsappNumber,
    email: adv.email,
    bio: adv.bio,
  };
}

function mapDbToLead(row: any): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    apartment: row.apartment,
    apartmentId: row.apartment_id,
    advisor: row.advisor,
    advisorId: row.advisor_id,
    message: row.message,
    purchaseTimeline: row.purchase_timeline || row.purchaseTimeline,
    createdAt: row.created_at || row.createdAt,
    status: row.status,
  };
}

function mapLeadToDb(lead: Lead): any {
  return {
    id: lead.id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    apartment: lead.apartment,
    apartment_id: lead.apartmentId,
    advisor: lead.advisor,
    advisor_id: lead.advisorId,
    message: lead.message,
    purchase_timeline: lead.purchaseTimeline,
    created_at: lead.createdAt,
    status: lead.status,
  };
}

function mapDbToSeparation(row: any): SeparationRequest {
  return {
    id: row.id,
    code: row.code,
    apartment: row.apartment_data ? JSON.parse(row.apartment_data) : { unitNumber: row.apartment_unit_number } as any,
    apartmentUnitNumber: row.apartment_unit_number,
    advisor: row.advisor_data ? JSON.parse(row.advisor_data) : { name: row.advisor_name } as any,
    advisorName: row.advisor_name,
    applicantName: row.applicant_name,
    applicantLastName: row.applicant_last_name,
    applicantIdNumber: row.applicant_id_number,
    applicantPhone: row.applicant_phone,
    applicantEmail: row.applicant_email,
    applicantCity: row.applicant_city,
    purchaseTimeline: row.purchase_timeline,
    date: row.date || row.created_at?.split('T')[0],
    createdAt: row.created_at,
    status: row.status,
    notes: row.notes,
  };
}

function mapSeparationToDb(sep: SeparationRequest): any {
  return {
    id: sep.id,
    code: sep.code,
    apartment_unit_number: sep.apartment?.unitNumber || sep.apartmentUnitNumber,
    apartment_data: JSON.stringify(sep.apartment),
    advisor_name: sep.advisor?.name || sep.advisorName,
    advisor_data: JSON.stringify(sep.advisor),
    applicant_name: sep.applicantName,
    applicant_last_name: sep.applicantLastName,
    applicant_id_number: sep.applicantIdNumber,
    applicant_phone: sep.applicantPhone,
    applicant_email: sep.applicantEmail,
    applicant_city: sep.applicantCity,
    purchase_timeline: sep.purchaseTimeline,
    created_at: sep.createdAt || new Date().toISOString(),
    status: sep.status || 'Pendiente',
    notes: sep.notes || '',
  };
}
