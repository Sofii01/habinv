# Despliegue en Railway — paso a paso

Habinv es una SPA Angular 21. En Railway se compila con `npm run build` y se sirve con `scripts/serve.js`, un servidor estático sin dependencias que hace fallback a `index.html` para que `/proyecto/:slug` funcione al recargar.

## Qué ya está preparado en el repo

| Archivo | Para qué sirve |
|---|---|
| `railway.json` | Comando de build, comando de arranque (`node scripts/serve.js`), healthcheck y política de reinicio. |
| `scripts/serve.js` | Servidor estático con fallback SPA, caché larga para archivos con hash y protección contra path traversal. Lee el puerto de `PORT`. |
| `scripts/generate-env.js` | Genera `src/environments/environment*.ts` desde la variable `GOOGLE_SHEETS_ENDPOINT` antes de cada build (`prebuild`). |
| `.node-version` | Fija Node 22 (Angular 21 necesita ≥ 20.19). |
| `package-lock.json` | Se mantiene el generado con npm 10.8.2. **No regenerar con npm 11** (ver "Problemas conocidos"). |

> `src/environments/environment.ts` y `environment.development.ts` **ya no se versionan**: contienen la URL real del endpoint y se regeneran solos.

## Antes de desplegar (una sola vez)

1. **Commit de los cambios de preparación**:
   ```bash
   git add .gitignore package.json railway.json scripts/serve.js .node-version docs
   git commit -m "Preparar despliegue en Railway"
   git push origin main
   ```
   Confirmá con `git status` que `package-lock.json` y `src/environments/*` **no** aparecen como modificados para subir.
2. **Repo en GitHub**: `anabelle-dimarco/habinv`. Railway necesita acceso a ese repositorio (si es de otra cuenta, instalá la GitHub App de Railway en ella).
3. **Endpoint de Google Sheets**: tené a mano la URL del Apps Script (`https://script.google.com/macros/s/.../exec`). Está en tu `.env` local. Verificá que el Web App esté publicado con acceso "Cualquier usuario".

## Pasos en Railway

1. Entrá a <https://railway.com> → **New Project** → **Deploy from GitHub repo** → elegí `habinv`, rama `main`.
2. Railway detecta Node y toma `railway.json`. No hace falta configurar comandos a mano; si el panel los muestra, deben coincidir:
   - Build: `npm run build`
   - Start: `node scripts/serve.js`
3. En el servicio → **Variables** → **New Variable**:
   - `GOOGLE_SHEETS_ENDPOINT` = la URL del Apps Script.
   
   Sin esta variable el build funciona, pero el formulario de contacto **no envía nada** (solo hace `console.log`). La variable se lee en el build, así que si la cambiás hay que **redesplegar**.
4. **Settings → Networking → Generate Domain** para obtener `https://habinv-xxxx.up.railway.app`.
5. Esperá a que el deploy termine (logs: "Habinv sirviendo ... en el puerto ...").
6. **Dominio propio (opcional)**: Settings → Networking → **Custom Domain**, y creá en tu DNS el registro CNAME que Railway indique. El certificado HTTPS es automático.

## Verificación posterior al deploy

- [ ] `/` carga con imágenes y estilos.
- [ ] Entrar a `/proyecto/miral-towers` y **recargar (F5)**: debe seguir mostrando la ficha (prueba el fallback SPA).
- [ ] `/ruta-inexistente` redirige a inicio.
- [ ] Enviar el formulario de contacto y comprobar que aparece una fila nueva en la hoja de Google.
- [ ] El simulador calcula y se ve bien en móvil.
- [ ] Un archivo inexistente (`/img/no-existe.png`) devuelve 404 y no el HTML de la app.

## Despliegues posteriores

Cada `git push` a `main` redespliega automáticamente. Para revertir: Railway → **Deployments** → deploy anterior → **Redeploy**.

## Problemas conocidos

- **`npm ci` falla con "Missing: @emnapi/core from lock file"**: pasa si el lock se regeneró con npm 11 (otra versión que la del proyecto, `npm@10.8.2`). El lock del repo está bien; si alguien lo regenera, usar `npx npm@10.8.2 install` y revisar que `git diff package-lock.json` no elimine `@emnapi/*`.
- **El formulario "envía" pero no llega nada a la hoja**: falta `GOOGLE_SHEETS_ENDPOINT` en Railway, o se agregó después del último deploy (redesplegar).
- **Aviso de budget de CSS en `simulador.component.ts`** (4,85 kB sobre 4 kB): es solo un warning; para silenciarlo, subir `anyComponentStyle.maximumWarning` en `angular.json` o mover estilos a `styles.css`.
- **Healthcheck falla**: revisar en los logs que no se haya cambiado el puerto; el servidor debe usar la variable `PORT` que inyecta Railway.

## Variables de entorno

| Variable | Obligatoria | Uso |
|---|---|---|
| `GOOGLE_SHEETS_ENDPOINT` | Sí (para recibir contactos) | URL del Web App de Apps Script. Se inyecta en el build. |
| `PORT` | No (la pone Railway) | Puerto del servidor. |

## Seguridad

- La URL del Apps Script termina en el bundle JS público: cualquiera que la vea puede hacer POST. Mitigaciones sugeridas en el Apps Script: validar campos, limitar longitud y agregar un campo honeypot anti-spam. Ver Fase 1 de `plan-backoffice.md`.
