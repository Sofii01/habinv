export interface PaisTelefono {
  codigo: string; // código de llamada sin el '+', ej "54"
  pais: string;
}

// Códigos de llamada internacional (E.164) más comunes, de mayor a menor longitud
// para poder matchear por prefijo más largo primero.
export const PAISES_TELEFONO: PaisTelefono[] = [
  // Américas
  { codigo: '1', pais: 'Estados Unidos' },
  { codigo: '54', pais: 'Argentina' },
  { codigo: '55', pais: 'Brasil' },
  { codigo: '56', pais: 'Chile' },
  { codigo: '57', pais: 'Colombia' },
  { codigo: '58', pais: 'Venezuela' },
  { codigo: '51', pais: 'Perú' },
  { codigo: '52', pais: 'México' },
  { codigo: '53', pais: 'Cuba' },
  { codigo: '502', pais: 'Guatemala' },
  { codigo: '503', pais: 'El Salvador' },
  { codigo: '504', pais: 'Honduras' },
  { codigo: '505', pais: 'Nicaragua' },
  { codigo: '506', pais: 'Costa Rica' },
  { codigo: '507', pais: 'Panamá' },
  { codigo: '509', pais: 'Haití' },
  { codigo: '591', pais: 'Bolivia' },
  { codigo: '592', pais: 'Guyana' },
  { codigo: '593', pais: 'Ecuador' },
  { codigo: '594', pais: 'Guayana Francesa' },
  { codigo: '595', pais: 'Paraguay' },
  { codigo: '596', pais: 'Martinica' },
  { codigo: '597', pais: 'Surinam' },
  { codigo: '598', pais: 'Uruguay' },
  { codigo: '1809', pais: 'República Dominicana' },

  // Europa
  { codigo: '34', pais: 'España' },
  { codigo: '33', pais: 'Francia' },
  { codigo: '39', pais: 'Italia' },
  { codigo: '49', pais: 'Alemania' },
  { codigo: '44', pais: 'Reino Unido' },
  { codigo: '351', pais: 'Portugal' },
  { codigo: '31', pais: 'Países Bajos' },
  { codigo: '32', pais: 'Bélgica' },
  { codigo: '41', pais: 'Suiza' },
  { codigo: '43', pais: 'Austria' },
  { codigo: '46', pais: 'Suecia' },
  { codigo: '47', pais: 'Noruega' },
  { codigo: '45', pais: 'Dinamarca' },
  { codigo: '358', pais: 'Finlandia' },
  { codigo: '353', pais: 'Irlanda' },
  { codigo: '30', pais: 'Grecia' },
  { codigo: '48', pais: 'Polonia' },
  { codigo: '420', pais: 'República Checa' },
  { codigo: '421', pais: 'Eslovaquia' },
  { codigo: '36', pais: 'Hungría' },
  { codigo: '40', pais: 'Rumania' },
  { codigo: '359', pais: 'Bulgaria' },
  { codigo: '385', pais: 'Croacia' },
  { codigo: '386', pais: 'Eslovenia' },
  { codigo: '7', pais: 'Rusia' },
  { codigo: '380', pais: 'Ucrania' },
  { codigo: '375', pais: 'Bielorrusia' },
  { codigo: '352', pais: 'Luxemburgo' },
  { codigo: '377', pais: 'Mónaco' },
  { codigo: '378', pais: 'San Marino' },
  { codigo: '379', pais: 'Ciudad del Vaticano' },
  { codigo: '354', pais: 'Islandia' },
  { codigo: '356', pais: 'Malta' },
  { codigo: '357', pais: 'Chipre' },
  { codigo: '371', pais: 'Letonia' },
  { codigo: '370', pais: 'Lituania' },
  { codigo: '372', pais: 'Estonia' },
  { codigo: '381', pais: 'Serbia' },
  { codigo: '382', pais: 'Montenegro' },
  { codigo: '383', pais: 'Kosovo' },
  { codigo: '387', pais: 'Bosnia y Herzegovina' },
  { codigo: '389', pais: 'Macedonia del Norte' },
  { codigo: '355', pais: 'Albania' },
  { codigo: '376', pais: 'Andorra' },
  { codigo: '423', pais: 'Liechtenstein' },

  // Asia
  { codigo: '86', pais: 'China' },
  { codigo: '91', pais: 'India' },
  { codigo: '81', pais: 'Japón' },
  { codigo: '82', pais: 'Corea del Sur' },
  { codigo: '850', pais: 'Corea del Norte' },
  { codigo: '852', pais: 'Hong Kong' },
  { codigo: '853', pais: 'Macao' },
  { codigo: '886', pais: 'Taiwán' },
  { codigo: '84', pais: 'Vietnam' },
  { codigo: '66', pais: 'Tailandia' },
  { codigo: '65', pais: 'Singapur' },
  { codigo: '60', pais: 'Malasia' },
  { codigo: '62', pais: 'Indonesia' },
  { codigo: '63', pais: 'Filipinas' },
  { codigo: '92', pais: 'Pakistán' },
  { codigo: '880', pais: 'Bangladés' },
  { codigo: '94', pais: 'Sri Lanka' },
  { codigo: '95', pais: 'Myanmar' },
  { codigo: '93', pais: 'Afganistán' },
  { codigo: '98', pais: 'Irán' },
  { codigo: '964', pais: 'Irak' },
  { codigo: '966', pais: 'Arabia Saudita' },
  { codigo: '971', pais: 'Emiratos Árabes Unidos' },
  { codigo: '972', pais: 'Israel' },
  { codigo: '970', pais: 'Palestina' },
  { codigo: '973', pais: 'Baréin' },
  { codigo: '974', pais: 'Catar' },
  { codigo: '965', pais: 'Kuwait' },
  { codigo: '968', pais: 'Omán' },
  { codigo: '962', pais: 'Jordania' },
  { codigo: '961', pais: 'Líbano' },
  { codigo: '963', pais: 'Siria' },
  { codigo: '90', pais: 'Turquía' },
  { codigo: '995', pais: 'Georgia' },
  { codigo: '994', pais: 'Azerbaiyán' },
  { codigo: '374', pais: 'Armenia' },
  { codigo: '996', pais: 'Kazajistán' },
  { codigo: '998', pais: 'Uzbekistán' },
  { codigo: '976', pais: 'Mongolia' },
  { codigo: '977', pais: 'Nepal' },
  { codigo: '975', pais: 'Bután' },
  { codigo: '960', pais: 'Maldivas' },

  // Oceanía
  { codigo: '61', pais: 'Australia' },
  { codigo: '64', pais: 'Nueva Zelanda' },
  { codigo: '679', pais: 'Fiyi' },
  { codigo: '675', pais: 'Papúa Nueva Guinea' },

  // África
  { codigo: '27', pais: 'Sudáfrica' },
  { codigo: '20', pais: 'Egipto' },
  { codigo: '234', pais: 'Nigeria' },
  { codigo: '254', pais: 'Kenia' },
  { codigo: '233', pais: 'Ghana' },
  { codigo: '212', pais: 'Marruecos' },
  { codigo: '213', pais: 'Argelia' },
  { codigo: '216', pais: 'Túnez' },
  { codigo: '218', pais: 'Libia' },
  { codigo: '249', pais: 'Sudán' },
  { codigo: '251', pais: 'Etiopía' },
  { codigo: '255', pais: 'Tanzania' },
  { codigo: '256', pais: 'Uganda' },
  { codigo: '244', pais: 'Angola' },
  { codigo: '258', pais: 'Mozambique' },
  { codigo: '260', pais: 'Zambia' },
  { codigo: '263', pais: 'Zimbabue' },
  { codigo: '221', pais: 'Senegal' },
  { codigo: '225', pais: 'Costa de Marfil' },
  { codigo: '237', pais: 'Camerún' },
].sort((a, b) => b.codigo.length - a.codigo.length);

/** Lista de países únicos, ordenada alfabéticamente, para poblar un <select>. */
export const PAISES = Array.from(new Set(PAISES_TELEFONO.map(p => p.pais))).sort((a, b) =>
  a.localeCompare(b, 'es')
);

/**
 * Deduce el país a partir de un teléfono en formato internacional (con '+').
 * Prueba los códigos de llamada de mayor a menor longitud para resolver
 * ambigüedades (ej. "+54" Argentina antes que un posible "+5").
 */
export function paisPorTelefono(telefono: string): string | null {
  const limpio = telefono.trim();
  if (!limpio.startsWith('+')) return null;

  const digitos = limpio.slice(1).replace(/\D/g, '');
  if (!digitos) return null;

  const match = PAISES_TELEFONO.find(({ codigo }) => digitos.startsWith(codigo));
  return match?.pais ?? null;
}
