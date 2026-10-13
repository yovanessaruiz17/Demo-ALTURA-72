import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { ProjectIntro } from './sections/ProjectIntro';
import { BuildingCatalog } from './sections/BuildingCatalog';
import { BuildingSelector } from './sections/BuildingSelector';
import { Amenities } from './sections/Amenities';
import { AdvisorsSection } from './sections/AdvisorsSection';
import { Gallery } from './sections/Gallery';
import { Location } from './sections/Location';
import { CommercialCTA } from './sections/CommercialCTA';
import { Footer } from './sections/Footer';

import { ApartmentDetailModal } from './components/ApartmentDetailModal';
import { SeparationModal } from './components/SeparationModal';
import { ContactInquiryModal } from './components/ContactInquiryModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { Toast } from './components/Toast';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

import { ApartmentUnit, Advisor, SeparationRequest, ContactInquiry } from './types';
import { GALLERY_ITEMS } from './data/projectData';
import { BUILDING_APARTMENTS, ADVISORS_TEAM } from './data/apartmentsData';
import { generateAdvisorWhatsAppUrl } from './utils/whatsapp';
import {
  getApartments,
  getAdvisors,
  subscribeToDataChanges,
} from './services/dataService';

export default function App() {
  // Navigation & Admin Routing State
  const [isAdminView, setIsAdminView] = useState(() => {
    return (
      window.location.pathname === '/admin' ||
      window.location.hash === '#admin' ||
      window.location.hash.startsWith('#/admin')
    );
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('altura72_admin_auth') === 'true';
  });

  // Dynamic Data States (synced with dataService)
  const [apartments, setApartments] = useState<ApartmentUnit[]>(BUILDING_APARTMENTS);
  const [advisors, setAdvisors] = useState<Advisor[]>(ADVISORS_TEAM);

  // Modal States
  const [detailModalApartment, setDetailModalApartment] = useState<ApartmentUnit | null>(null);
  const [separationApartment, setSeparationApartment] = useState<ApartmentUnit | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryApartment, setInquiryApartment] = useState<ApartmentUnit | null>(null);
  const [inquiryAdvisor, setInquiryAdvisor] = useState<Advisor | null>(null);

  // Gallery Lightbox State
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load and Subscribe to Data
  const refreshData = async () => {
    try {
      const [latestApts, latestAdvs] = await Promise.all([
        getApartments(),
        getAdvisors(),
      ]);
      if (latestApts && latestApts.length > 0) setApartments(latestApts);
      if (latestAdvs && latestAdvs.length > 0) setAdvisors(latestAdvs);
    } catch (err) {
      console.error('Error refreshing data from dataService', err);
    }
  };

  useEffect(() => {
    refreshData();
    const unsubscribe = subscribeToDataChanges(() => {
      refreshData();
    });
    return () => unsubscribe();
  }, []);

  // Listen to URL hash & popstate changes for routing
  useEffect(() => {
    const handleLocationChange = () => {
      const isAdmin =
        window.location.pathname === '/admin' ||
        window.location.hash === '#admin' ||
        window.location.hash.startsWith('#/admin');
      setIsAdminView(isAdmin);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = 'admin';
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPublic = () => {
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    } else {
      window.location.hash = '';
    }
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setToastMessage('Acceso concedido al Portal Administrativo.');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('altura72_admin_auth');
    setIsAdminAuthenticated(false);
    navigateToPublic();
    setToastMessage('Sesión administrativa finalizada.');
  };

  // Action Handlers
  const handleOpenDetail = (apt: ApartmentUnit) => {
    setDetailModalApartment(apt);
  };

  const handleOpenSeparation = (apt: ApartmentUnit) => {
    setSeparationApartment(apt);
  };

  const handleOpenInquiryForApartment = (apt: ApartmentUnit) => {
    setInquiryApartment(apt);
    setInquiryAdvisor(null);
    setInquiryModalOpen(true);
  };

  const handleOpenInquiryForAdvisor = (adv: Advisor) => {
    setInquiryAdvisor(adv);
    setInquiryApartment(apartments[0] || BUILDING_APARTMENTS[0]);
    setInquiryModalOpen(true);
  };

  const handleGeneralAdvisorInquiry = () => {
    setInquiryApartment(null);
    setInquiryAdvisor(advisors[0] || ADVISORS_TEAM[0]);
    setInquiryModalOpen(true);
  };

  const handleDirectWhatsAppAdvisor = (apt: ApartmentUnit) => {
    const advisor = advisors[0] || ADVISORS_TEAM[0];
    const url = generateAdvisorWhatsAppUrl(advisor.name, advisor.whatsappNumber, apt.unitNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleExploreApartments = () => {
    const el = document.getElementById('apartamentos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeparationSuccess = (req: SeparationRequest) => {
    setToastMessage(
      `¡Solicitud ${req.code} registrada con éxito! Tu asesor ${
        req.advisor?.name || req.advisorName || 'asignado'
      } ha recibido los detalles.`
    );
    refreshData();
  };

  const handleInquirySuccess = (inquiry: ContactInquiry) => {
    setToastMessage(
      `¡Gracias ${inquiry.applicantName}! Tu consulta ha sido canalizada a ${
        inquiry.advisor?.name || 'nuestro equipo'
      }.`
    );
    refreshData();
  };

  // IF ADMIN ROUTE IS ACTIVE
  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <>
          <AdminLogin
            onLoginSuccess={handleAdminLoginSuccess}
            onBackToPublic={navigateToPublic}
          />
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        </>
      );
    }

    return (
      <>
        <AdminLayout
          onBackToPublic={navigateToPublic}
          onLogout={handleAdminLogout}
          onToast={(msg) => setToastMessage(msg)}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </>
    );
  }

  // PUBLIC WEBSITE (FASE 1, FASE 2 & FASE 3 PUBLIC FEATURES)
  return (
    <div className="min-h-screen bg-[#0B1320] text-[#FAF9F6] selection:bg-[#C5A880]/30 selection:text-white flex flex-col font-sans">
      {/* 1. Header (Desktop 3-zone contract, mobile drawer, admin shortcut) */}
      <Header
        onOpenAdvisor={handleGeneralAdvisorInquiry}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 2. Hero */}
        <Hero
          onOpenAdvisor={handleGeneralAdvisorInquiry}
          onExploreApartments={handleExploreApartments}
        />

        {/* 3. Presentación Arquitectónica del Proyecto */}
        <ProjectIntro />

        {/* 4. Catálogo de Apartamentos ("Encuentra tu apartamento" con Filtros Reales y datos sincronizados) */}
        <BuildingCatalog
          apartments={apartments}
          onSelectApartment={handleOpenDetail}
          onOpenSeparation={handleOpenSeparation}
          onOpenAdvisorInquiry={handleOpenInquiryForApartment}
        />

        {/* 5. Selector del Edificio (Fachada interactiva por pisos y convenciones visuales) */}
        <BuildingSelector
          apartments={apartments}
          onSelectApartment={handleOpenDetail}
          onOpenSeparation={handleOpenSeparation}
          onOpenAdvisorInquiry={handleOpenInquiryForApartment}
        />

        {/* 6. Amenidades */}
        <Amenities onOpenAdvisor={handleGeneralAdvisorInquiry} />

        {/* 7. Asesores Comerciales ("Habla con nuestros asesores": Laura, Carlos, Valentina) */}
        <AdvisorsSection
          advisors={advisors}
          onSelectAdvisorForInquiry={handleOpenInquiryForAdvisor}
        />

        {/* 8. Galería de Espacios con Lightbox */}
        <Gallery onOpenLightbox={(idx) => setGalleryIndex(idx)} />

        {/* 9. Ubicación Estratégica en Cartagena de Indias */}
        <Location />

        {/* 10. CTA Comercial Final */}
        <CommercialCTA
          onOpenAdvisor={handleGeneralAdvisorInquiry}
          onExploreApartments={handleExploreApartments}
        />
      </main>

      {/* 11. Footer con Atribución YorDev y disclaimer reglamentario */}
      <Footer
        onOpenAdvisor={handleGeneralAdvisorInquiry}
        onOpenAdmin={navigateToAdmin}
      />

      {/* MODALS & WORKFLOWS */}

      {/* Apartment Detail Modal */}
      <ApartmentDetailModal
        apartment={detailModalApartment}
        isOpen={detailModalApartment !== null}
        onClose={() => setDetailModalApartment(null)}
        onOpenSeparation={handleOpenSeparation}
        onOpenInquiry={handleOpenInquiryForApartment}
        onOpenAdvisorWhatsApp={handleDirectWhatsAppAdvisor}
      />

      {/* Multi-step Separation Flow Modal */}
      <SeparationModal
        apartment={separationApartment}
        isOpen={separationApartment !== null}
        onClose={() => setSeparationApartment(null)}
        onSuccess={handleSeparationSuccess}
      />

      {/* Contact & Advisor Assignment Modal */}
      <ContactInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialApartment={inquiryApartment}
        initialAdvisor={inquiryAdvisor}
        onSuccess={handleInquirySuccess}
      />

      {/* Gallery Lightbox */}
      <GalleryLightbox
        items={GALLERY_ITEMS}
        currentIndex={galleryIndex}
        onClose={() => setGalleryIndex(null)}
        onNavigate={(newIdx) => setGalleryIndex(newIdx)}
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
