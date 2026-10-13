-- ==============================================================================
-- ALTURA 72 | ESQUEMA DE BASE DE DATOS PARA SUPABASE (POSTGRESQL)
-- Proyecto Residencial en Cartagena de Indias - Desarrollado por YorDev
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA: APARTAMENTOS (INVENTARIO ARQUITECTÓNICO)
CREATE TABLE IF NOT EXISTS public.apartments (
    id TEXT PRIMARY KEY,
    unit_number TEXT NOT NULL UNIQUE,
    floor INTEGER NOT NULL,
    type TEXT NOT NULL,
    area NUMERIC(6,2) NOT NULL,
    bedrooms INTEGER NOT NULL DEFAULT 1,
    bathrooms INTEGER NOT NULL DEFAULT 1,
    parking INTEGER NOT NULL DEFAULT 1,
    price_cop NUMERIC(14,2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Disponible', 'Separado', 'Vendido', 'Últimas unidades', 'En preventa')),
    tagline TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    orientation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: ASESORES COMERCIALES
CREATE TABLE IF NOT EXISTS public.advisors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    specialty TEXT,
    avatar TEXT,
    status TEXT NOT NULL DEFAULT 'Activo' CHECK (status IN ('Activo', 'Inactivo')),
    availability TEXT,
    phone_display TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    email TEXT NOT NULL,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA: LEADS (CONSULTAS DE CONTACTO E INFORMACIÓN)
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    apartment TEXT,
    apartment_id TEXT,
    advisor TEXT,
    advisor_id TEXT,
    message TEXT,
    purchase_timeline TEXT,
    status TEXT NOT NULL DEFAULT 'Nuevo' CHECK (status IN ('Nuevo', 'Contactado', 'En seguimiento', 'Cerrado')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA: SOLICITUDES DE SEPARACIÓN
CREATE TABLE IF NOT EXISTS public.separations (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    apartment_unit_number TEXT,
    apartment_data JSONB,
    advisor_name TEXT,
    advisor_data JSONB,
    applicant_name TEXT NOT NULL,
    applicant_last_name TEXT NOT NULL,
    applicant_id_number TEXT,
    applicant_phone TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_city TEXT,
    purchase_timeline TEXT,
    status TEXT NOT NULL DEFAULT 'Pendiente' CHECK (status IN ('Pendiente', 'En validación', 'Aprobada', 'Rechazada')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. POLÍTICAS DE ACCESO (ROW LEVEL SECURITY - RLS)
ALTER TABLE public.apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.separations ENABLE ROW LEVEL SECURITY;

-- Permitir lectura y escritura con clave pública anónima (para prototipo / portfolio)
CREATE POLICY "Public read apartments" ON public.apartments FOR SELECT USING (true);
CREATE POLICY "Public insert/update apartments" ON public.apartments FOR ALL USING (true);

CREATE POLICY "Public read advisors" ON public.advisors FOR SELECT USING (true);
CREATE POLICY "Public manage advisors" ON public.advisors FOR ALL USING (true);

CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read/update leads" ON public.leads FOR ALL USING (true);

CREATE POLICY "Public insert separations" ON public.separations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read/update separations" ON public.separations FOR ALL USING (true);

-- 7. ÍNDICES DE RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_apartments_status ON public.apartments(status);
CREATE INDEX IF NOT EXISTS idx_apartments_floor ON public.apartments(floor);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_separations_code ON public.separations(code);
