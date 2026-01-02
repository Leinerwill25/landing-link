# Configuración de Supabase

Este proyecto usa Supabase para almacenar el contenido en producción.

## Pasos para Configurar Supabase

### 1. Crear un Proyecto en Supabase

1. Ve a [Supabase](https://supabase.com) y crea una cuenta o inicia sesión
2. Haz clic en **New Project**
3. Completa la información:
   - **Name**: Nombre de tu proyecto
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona la región más cercana
4. Haz clic en **Create new project**

### 2. Ejecutar el SQL Schema

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Haz clic en **New query**
3. Copia y pega el contenido del archivo `supabase_schema.sql`
4. Haz clic en **Run** para ejecutar el SQL
5. Deberías ver un mensaje de éxito

### 3. Obtener las Credenciales de API

1. Ve a **Settings** → **API** en tu proyecto de Supabase
2. Encuentra las siguientes credenciales:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **service_role** key (SUPABASE_SERVICE_ROLE_KEY) - ⚠️ Mantén esta secreta

### 4. Configurar Variables de Entorno

#### En Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Ve a **Settings** → **Environment Variables**
3. Agrega las siguientes variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
```

#### En Desarrollo Local:

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
```

⚠️ **Importante**: No commitees el archivo `.env.local` al repositorio. Ya debería estar en `.gitignore`.

### 5. Instalar Dependencias

```bash
npm install
```

### 6. Redesplegar

Si estás usando Vercel:
1. Haz commit y push de los cambios
2. O ve a **Deployments** y haz **Redeploy**

## Funcionamiento

- **Con Supabase configurado**: El sistema guarda y lee desde Supabase
- **Sin Supabase configurado**: El sistema usa el archivo `data/content.json` (solo en desarrollo local)

## Verificación

1. Ve al dashboard de administración
2. Haz cambios en el contenido
3. Haz clic en "Guardar Cambios"
4. Deberías ver: "✅ Contenido guardado exitosamente"
5. Recarga la página principal y verifica que los cambios se reflejen

## Seguridad (Row Level Security)

El SQL incluye políticas de seguridad básicas:
- **Lectura pública**: Cualquiera puede leer el contenido
- **Escritura autenticada**: Solo usuarios autenticados pueden escribir

Si necesitas ajustar estas políticas, edítalas en Supabase Dashboard → **Authentication** → **Policies**.

## Solución de Problemas

### Error: "Failed to save content"
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de haber ejecutado el SQL schema
- Revisa los logs en Supabase Dashboard → **Logs**

### Error: "relation 'content' does not exist"
- Ejecuta el SQL schema en Supabase SQL Editor

### Los cambios no se reflejan
- Verifica que las variables de entorno estén en Vercel
- Asegúrate de haber redesplegado después de agregar las variables
- Revisa la consola del navegador para errores

