# Plan de backoffice para Habinv

## 1. Punto de partida

- Frontend Angular 21 estático, sin backend.
- Los **contactos** se guardan en una hoja de Google vía Apps Script (campos: `nombre`, `telefono`, `email`, `pais`, `proyecto`).
- Los **proyectos** están fijos en código (`src/app/proyectos/proyectos.data.ts`, 6 proyectos con `slug`, textos, imágenes, `tipo`, `desde`, `tasa`, `meses`, `financiacion`). Cambiar un precio o añadir un proyecto exige un commit y un deploy.

## 2. Qué debería resolver el backoffice

1. **Gestionar contactos/leads**: verlos, estado (nuevo, contactado, descartado…), notas, exportar.
2. **Gestionar proyectos** sin tocar código: crear/editar/ocultar, subir imágenes.
3. **Acceso restringido** al equipo (login).
4. Opcional: parámetros del simulador y notificaciones por email de nuevos leads.

## 3. Opciones

| Opción | Descripción | Esfuerzo | Costo | Pros | Contras |
|---|---|---|---|---|---|
| **A. Seguir con Google Sheets** | La hoja es el backoffice; se mejora el Apps Script (validación, anti-spam, aviso por email). | Muy bajo (1–2 días) | $0 | Ya funciona; el equipo conoce Sheets | Sin login propio, sin gestión de proyectos, no escala |
| **B. Panel Angular + backend propio en Railway** | Nueva app Node (NestJS o Express) + PostgreSQL en Railway, y rutas `/admin` en Angular. | Alto (4–6 semanas) | ~$5–15/mes Railway | Control total, mismo stack, todo en Railway | Hay que construir y mantener auth, CRUD, subida de imágenes |
| **C. Headless CMS (Strapi / Directus) en Railway** | CMS autoalojado con panel de admin listo; Angular consume su API. | Medio (2–3 semanas) | ~$5–15/mes | Panel, roles, medios y API incluidos | Un servicio más que operar; personalizar vistas de leads cuesta |
| **D. BaaS (Supabase o Firebase)** | Base de datos + auth + storage gestionados; panel Angular propio o Retool. | Medio (2–3 semanas) | Gratis al inicio | Menos infraestructura; auth y storage resueltos | Dependencia del proveedor; reglas de seguridad a cuidar |

## 4. Recomendación

**Enfoque por fases, empezando por A y migrando a C (Directus o Strapi en Railway).**

- El dolor inmediato son los **leads** y la **edición de proyectos**, y un CMS cubre ambos con un panel listo, roles y subida de imágenes.
- Usarlo evita escribir login, CRUD y gestión de archivos desde cero, que sería el 70 % del trabajo de la opción B.
- Directus se adapta bien a Postgres y a un modelo de datos existente. Strapi tiene comunidad más grande. Se decide con un spike de medio día (ver Fase 2).
- Si el equipo prefiere no operar servicios, D (Supabase) es el plan alternativo.

## 5. Modelo de datos propuesto

**`proyectos`**: `id`, `slug` (único), `nombre`, `ciudad`, `pais`, `descripcion`, `potencial`, `tipo`, `desde` (numérico + moneda), `tasa`, `meses`, `financiacion`, `imagen_principal`, `galeria` (varias imágenes), `foto_detalle`, `foto_contacto`, `publicado` (bool), `orden`, `created_at`, `updated_at`.

**`leads`**: `id`, `nombre`, `telefono`, `email`, `pais`, `proyecto_id` (relación), `estado` (nuevo / contactado / en negociación / cerrado / descartado), `notas`, `origen`, `asignado_a`, `created_at`.

**`usuarios`**: gestionados por el CMS o por Supabase Auth, con roles `admin` y `editor`.

## 6. Fases

### Fase 0 — Preparar el despliegue (en curso)
Ver `despliegue-railway.md`. **Criterio de salida**: sitio público en Railway y formulario escribiendo en la hoja.

### Fase 1 — Endurecer el flujo actual (1–2 días)
- Apps Script: validar campos obligatorios y longitudes, campo honeypot, `timestamp` automático y email de aviso al equipo.
- Columna "estado" y "notas" en la hoja para empezar a trabajar los leads ya.
- **Criterio de salida**: nadie puede llenar la hoja de basura y el equipo recibe aviso de cada lead.

### Fase 2 — Spike y decisión (½–1 día)
- Levantar Directus y Strapi en Railway (plantillas de un clic), cargar `proyectos` y `leads`, evaluar la edición.
- Decidir con el equipo: CMS (C), Supabase (D) o backend propio (B).
- **Criterio de salida**: decisión documentada.

### Fase 3 — Backend de datos y leads (1–2 semanas)
- Crear colecciones `proyectos` y `leads`, roles y usuarios del equipo.
- Cambiar el formulario de contacto para que haga POST a la API (mantener Sheets en paralelo durante la transición).
- Migrar los leads existentes de la hoja (importación CSV).
- Protección anti-spam en la API (rate limit, honeypot, captcha si hace falta) y CORS solo para el dominio de Habinv.
- **Criterio de salida**: los leads nuevos entran por la API y se gestionan desde el panel.

### Fase 4 — Proyectos dinámicos (1 semana)
- Reemplazar `PROYECTOS` por una llamada a la API (servicio con `HttpClient` y señales), con caché y *fallback* al listado estático si la API falla.
- Imágenes servidas desde el storage del CMS (o volumen/S3) en lugar de `public/img`.
- Nueva variable `API_URL` en `generate-env.js` y en Railway.
- Revisar SEO: al ser una SPA, valorar prerender (`ng build` con SSR/prerender) si se quiere indexar cada ficha.
- **Criterio de salida**: crear o editar un proyecto en el panel se refleja en la web sin deploy.

### Fase 5 — Mejoras (según prioridad)
- Parámetros del simulador editables.
- Panel de métricas (leads por proyecto, por país, por estado).
- Notificaciones (email o WhatsApp) y asignación de leads.
- Backups programados de la base de datos y exportación periódica.

## 7. Arquitectura objetivo en Railway

```
Navegador ──> Servicio "web"   (Angular estático, scripts/serve.js)
          └─> Servicio "cms"   (Directus / Strapi) ──> PostgreSQL (plugin de Railway)
                                  └─ storage de imágenes (volumen o S3)
```

Tres elementos en un mismo proyecto de Railway; el frontend y el CMS se despliegan por separado.

## 8. Riesgos y decisiones abiertas

| Riesgo / pregunta | Mitigación |
|---|---|
| Datos personales de leads (nombre, teléfono, email) | Acceso por roles, HTTPS, backups, y aviso de privacidad en el formulario (revisar normativa de cada país objetivo). |
| Spam en el formulario público | Honeypot + rate limit; captcha si persiste. |
| SEO de fichas al ser SPA | Evaluar prerender/SSR en Fase 4. |
| ¿Quién administrará el panel y cuántos usuarios? | Definir antes de la Fase 2 (afecta a roles y costos). |
| ¿Se necesita multi-idioma o multi-moneda? | Hoy `desde` es texto ("USD 100"); modelarlo numérico si se quiere filtrar o convertir. |
| ¿Qué pasa con los leads históricos de la hoja? | Importación CSV en Fase 3. |

## 9. Siguiente paso inmediato

1. Terminar Fase 0 (desplegar).
2. Decidir si se hace la Fase 1 ya mismo (rápida y útil con cualquier opción).
3. Agendar el spike de la Fase 2 con quien vaya a usar el panel.
