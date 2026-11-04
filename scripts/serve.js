// Servidor estático mínimo (sin dependencias) para producción en Railway.
// Sirve dist/habinv-app/browser y hace fallback a index.html para las rutas de Angular.
const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', 'dist', 'habinv-app', 'browser');
const PUERTO = Number(process.env.PORT) || 3000;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

if (!fs.existsSync(path.join(RAIZ, 'index.html'))) {
  console.error(`No existe ${RAIZ}. Ejecutá "npm run build" antes de iniciar.`);
  process.exit(1);
}

function resolverArchivo(urlPath) {
  let ruta;
  try {
    ruta = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }
  const archivo = path.normalize(path.join(RAIZ, ruta));
  if (!archivo.startsWith(RAIZ)) return null;
  if (fs.existsSync(archivo) && fs.statSync(archivo).isFile()) return archivo;
  // Rutas con extensión que no existen (p. ej. /img/x.png) deben dar 404, no el index.
  if (path.extname(ruta)) return undefined;
  return path.join(RAIZ, 'index.html');
}

http
  .createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }

    const archivo = resolverArchivo(req.url);
    if (archivo === null) return void res.writeHead(400).end();
    if (archivo === undefined) return void res.writeHead(404).end('No encontrado');

    const nombre = path.basename(archivo);
    const esIndex = nombre === 'index.html';
    const conHash = /-[A-Z0-9]{8}\.(js|css)$/.test(nombre);
    res.writeHead(200, {
      'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream',
      'Cache-Control': conHash ? 'public, max-age=31536000, immutable' : esIndex ? 'no-cache' : 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') return void res.end();
    fs.createReadStream(archivo).pipe(res);
  })
  .listen(PUERTO, '0.0.0.0', () => console.log(`Habinv sirviendo ${RAIZ} en el puerto ${PUERTO}`));
