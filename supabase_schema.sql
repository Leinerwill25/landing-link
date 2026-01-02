-- ===================================
-- Supabase Schema para Linktree App
-- ===================================

-- Tabla principal para almacenar el contenido
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  social_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  videos JSONB NOT NULL DEFAULT '[]'::jsonb,
  products JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear un índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_content_updated_at ON content(updated_at DESC);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insertar un registro inicial vacío (solo si no existe)
INSERT INTO content (id, profile, social_links, videos, products)
VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  '{"name": "", "bio": "", "avatar": ""}'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Habilitar Row Level Security (RLS) - Opcional pero recomendado
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (opcional, ajusta según tus necesidades)
CREATE POLICY "Allow public read access" ON content
  FOR SELECT
  USING (true);

-- Política para permitir escritura solo a usuarios autenticados (ajusta según tus necesidades)
-- Nota: Necesitarás configurar autenticación en Supabase para esto
-- Para simplificar, permitimos escritura pública (puedes cambiar esto después)
CREATE POLICY "Allow public write access" ON content
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Si prefieres deshabilitar RLS completamente (solo para desarrollo):
-- ALTER TABLE content DISABLE ROW LEVEL SECURITY;

