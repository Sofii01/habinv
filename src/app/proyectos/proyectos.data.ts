export interface Proyecto {
  slug: string;
  nombre: string;
  ciudad: string;
  pais: string;
  descripcion: string;
  potencial: string;
  img: string;
  galeria: string[];
  fotoDetalle?: string;
  fotoContacto?: string;
  tipo: string;
  desde: string;
  tasa: number;
  meses: number;
  financiacion: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    slug: 'miral-towers',
    nombre: 'Miral Towers', ciudad: 'Buenos Aires', pais: 'Argentina',
    descripcion: 'Miral Towers llega a Buenos Aires con una propuesta de apartamentos inmersos en un entorno verde y moderno. Una tipología residencial con alta demanda y gran potencial de valorización en una de las capitales más dinámicas de Argentina.',
    potencial: 'Miral Towers se proyecta para Buenos Aires, Argentina, un mercado urbano consolidado con constante atracción de inversión. Es un proyecto de apartamentos de arquitectura moderna y espacios arbolados. Una oportunidad de desarrollo con alta plusvalía y sólido desempeño.',
    img: '/img/proyecto-1.jpg',
    galeria: [
      '/img/miral-towernova-comfort-2.png',
      '/img/miral-towernova-comfort-5.png',
      '/img/miral-towernova-comfort-3.png',
      '/img/miral-towernova-comfort-4.png',
      '/img/miral-towernova-comfort-1.png',
    ],
    tipo: 'Apartamentos', desde: 'USD 100', tasa: 16, meses: 3, financiacion: '87% financiado',
  },
  {
    slug: 'nova-comfort',
    nombre: 'Nova Comfort', ciudad: 'Buenos Aires', pais: 'Argentina',
    descripcion: 'Nova Comfort llega a Palermo con departamentos modernos, diseño funcional y amenities pensados para disfrutar la ciudad. Una propuesta residencial con alto potencial en una de las zonas más buscadas de Buenos Aires.',
    potencial: 'Nova Comfort se encuentra en Buenos Aires, Argentina, un polo urbano clave con permanente atracción de inversores y residentes. Es un desarrollo con apartamentos de calidad constructiva y arquitectónica, amplio confort y una excelente oportunidad de plusvalía a largo plazo.',
    img: '/img/proyecto-2.jpg',
    galeria: [
      '/img/nova-comfort2.png',
      '/img/nova-comfort4.png',
      '/img/nova-comfort5.png',
      '/img/nova-comfort6.png',
      '/img/nova-comfort3.png',
      '/img/nova-comfort1.png',
    ],
    fotoDetalle: '/img/nova-comfort5.png',
    fotoContacto: '/img/nova-comfort6.png',
    tipo: 'Apartamentos', desde: 'USD 100', tasa: 18, meses: 12, financiacion: '65% financiado',
  },
  {
    slug: 'atria-apartments',
    nombre: 'Atria Apartments', ciudad: 'Medellín', pais: 'Colombia',
    descripcion: 'Atria Apartments presenta apartamentos modernos en un entorno residencial privilegiado de Medellín, Colombia. Una tipología atractiva con gran proyección urbana y alto potencial de valorización en una de las ciudades más dinámicas de la región.',
    potencial: 'Atria Apartments se ubica en Medellín, Colombia, un mercado inmobiliario en constante expansión y alta demanda. Este complejo de apartamentos combina diseño contemporáneo y entorno verde con una sólida oportunidad de crecimiento.',
    img: '/img/proyecto-3.jpg',
    galeria: [
      '/img/atria-apartmentnova-comfort-1.png',
      '/img/atria-apartmentnova-comfort-3.png',
      '/img/atria-apartmentnova-comfort-5.png',
      '/img/atria-apartmentnova-comfort-6.png',
      '/img/atria-apartmentnova-comfort-2.png',
      '/img/atria-apartmentnova-comfort-4.png',
    ],
    fotoDetalle: '/img/atria-apartmentnova-comfort-5.png',
    fotoContacto: '/img/atria-apartmentnova-comfort-6.png',
    tipo: 'Apartamentos', desde: 'USD 100', tasa: 18, meses: 3, financiacion: '45% financiado',
  },
  {
    slug: 'compton-house',
    nombre: 'Compton House', ciudad: 'Zapallar', pais: 'Chile',
    descripcion: 'Compton House ofrece una residencia de lujo sobre los acantilados de Zapallar, Chile. Una casa exclusiva frente al mar con alto potencial de valorización en una de las zonas costeras más prestigiosas y codiciadas del país.',
    potencial: 'Compton House se sitúa en Zapallar, Chile, una de las costas más exclusivas y demandadas de la región. Esta casa de alto estándar combina vistas abiertas al mar con un sólido potencial de valorización en un entorno natural consolidado.',
    img: '/img/miral-towernova-comfort-ompton-hounova-comforte-3.png',
    galeria: [
      '/img/miral-towernova-comfort-ompton-hounova-comforte-3.png',
      '/img/miral-towernova-comfort-ompton-hounova-comforte-2.png',
      '/img/miral-towernova-comfort-ompton-hounova-comforte-4.png',
      '/img/miral-towernova-comfort-ompton-hounova-comforte-5.png',
      '/img/miral-towernova-comfort-ompton-hounova-comforte-1.png',
    ],
    fotoDetalle: '/img/miral-towernova-comfort-ompton-hounova-comforte-1.png',
    fotoContacto: '/img/miral-towernova-comfort-ompton-hounova-comforte-4.png',
    tipo: 'Casa', desde: 'USD 250', tasa: 7, meses: 18, financiacion: '12% financiado',
  },
];

export const porSlug = (slug: string) => PROYECTOS.find(p => p.slug === slug);

export const plazo = (p: Proyecto) => {
  const anios = Math.floor(p.meses / 12);
  const resto = p.meses % 12;
  if (anios === 0) return `${resto} meses`;
  const partes = [`${anios} año${anios > 1 ? 's' : ''}`];
  if (resto > 0) partes.push(`${resto} meses`);
  return partes.join(' ');
};

export const ubicacion = (p: Proyecto) => `${p.ciudad}, ${p.pais}`;

export const detalles = (p: Proyecto) => [
  { label: 'Tipo de propiedad', valor: p.tipo },
  { label: 'Desde', valor: p.desde },
  { label: 'Retorno estimado', valor: `${p.tasa}% anual` },
  { label: 'Plazo', valor: plazo(p) },
  { label: 'Financiación', valor: p.financiacion },
];
