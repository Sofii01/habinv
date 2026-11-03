import { Component } from '@angular/core';

@Component({
  selector: 'app-como-funciona',
  template: `
    <section id="como-funciona" class="seccion">
      <div class="contenedor">
        <div class="panel">
          <div class="intro">
            <h2 class="titulo">¿Cómo funciona el <em>crowdfunding inmobiliario</em> en Habinv?</h2>
            <p>El crowdfunding inmobiliario es una inversión colectiva inmobiliaria: varias personas aportan montos pequeños para financiar juntas un proyecto, y cada una recibe un retorno proporcional a su aporte, como en una propiedad fraccionada.</p>
            <a class="btn-cta" href="#proyectos">
              Explorar oportunidades
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </div>
        <div class="pasos">
          @for (paso of pasos; track paso.titulo; let i = $index) {
            <article class="paso">
              <img class="ilustracion" [src]="paso.img" alt="" loading="lazy" width="664" height="492">
              <div class="linea"></div>
              <h3>{{ i + 1 }}. {{ paso.titulo }}</h3>
              <p>{{ paso.texto }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .seccion { padding-top: 120px; padding-bottom: 120px; background: var(--fondo-claro); color: var(--texto-btn); }

    .panel {
      position: relative; border-radius: 4px 80px 4px 80px; overflow: hidden;
      min-height: 738px; display: flex; align-items: center;
      padding: 180px clamp(28px, 9.7%, 140px);
      color: var(--crema);
      background:
        linear-gradient(0deg, #102A2AB2, #102A2AB2),
        var(--img-como) center / cover no-repeat,
        var(--img-ciudad) center / cover no-repeat,
        var(--verde-oscuro);
    }
    .intro { display: grid; gap: 28px; justify-items: start; }
    .titulo { max-width: 560px; }
    .titulo em { color: var(--turquesa); font-style: italic; font-weight: 400; }
    .intro p { font-size: 20px; line-height: 24px; max-width: 470px; }
    .intro .btn-cta { margin-top: 12px; }

    .pasos { margin-top: 160px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
    .paso { display: flex; flex-direction: column; }
    .ilustracion { height: 270px; width: 100%; object-fit: contain; object-position: center; }
    .linea { position: relative; margin-top: 48px; height: 1.5px; background: var(--verde); }
    .linea::before {
      content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
      width: 9px; height: 9px; border-radius: 50%; background: var(--verde);
    }
    h3 {
      margin-top: 28px; font-size: clamp(28px, 3vw, 44px); line-height: 1.1;
      font-style: italic; font-weight: 400; color: var(--verde);
    }
    .paso p { margin-top: 28px; font-size: 20px; line-height: 24px; color: var(--texto-btn); }

    @media (max-width: 1100px) { .pasos { grid-template-columns: repeat(2, 1fr); gap: 56px 40px; } }
    @media (max-width: 620px) {
      .panel { min-height: 0; padding: 56px 28px; border-radius: 4px 56px 4px 56px; }
      .pasos { grid-template-columns: 1fr; margin-top: 90px; }
    }
  `,
})
export class ComoFuncionaComponent {
  pasos = [
    { titulo: 'Explora',  img: '/img/paso-1.png', texto: 'Encuentra proyectos inmobiliarios en los que puedes invertir y descubre nuevas oportunidades de rentabilidad.' },
    { titulo: 'Evalúa',   img: '/img/paso-2.png', texto: 'Conoce cada proyecto, su inversión mínima, retorno potencial, plazo y condiciones antes de decidir.' },
    { titulo: 'Simula',   img: '/img/paso-3.png', texto: 'Prueba distintos montos de inversión y descubre cuánto podrías obtener según cada proyecto.' },
    { titulo: 'Invierte', img: '/img/paso-4.png', texto: 'Manifiesta tu interés y te contactamos para explicarte cómo avanzar con tu inversión en cada proyecto.' },
  ];
}
