// Lee .env (si existe, para desarrollo local) y genera los environment.ts de Angular.
// En Railway no hace falta .env: las variables ya están en process.env al correr el build.
const fs = require('fs');
const path = require('path');

function cargarDotenv(ruta) {
  if (!fs.existsSync(ruta)) return;

  for (const linea of fs.readFileSync(ruta, 'utf8').split('\n')) {
    const match = linea.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const [, clave, valorCrudo] = match;
    if (!(clave in process.env)) {
      process.env[clave] = valorCrudo.trim().replace(/^['"]|['"]$/g, '');
    }
  }
}

cargarDotenv(path.resolve(__dirname, '..', '.env'));

const googleSheetsEndpoint = process.env.GOOGLE_SHEETS_ENDPOINT || '';

const generar = (production) => `// Archivo generado automáticamente por scripts/generate-env.js a partir de .env — no editar a mano.
export const environment = {
  production: ${production},
  googleSheetsEndpoint: '${googleSheetsEndpoint}',
};
`;

const dir = path.resolve(__dirname, '..', 'src', 'environments');
fs.writeFileSync(path.join(dir, 'environment.ts'), generar(true));
fs.writeFileSync(path.join(dir, 'environment.development.ts'), generar(false));

console.log(`environment.ts generado (googleSheetsEndpoint: ${googleSheetsEndpoint ? 'configurado' : 'vacío'})`);
