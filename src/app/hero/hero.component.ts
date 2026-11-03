import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <section id="inicio" class="hero">
      <div class="foto" role="img" aria-label="Edificio residencial con balcones y vegetación"></div>
      <div class="contenedor texto">
        <div class="principal">
          <h1>Invertí <em>desde 100 USD</em> y hacé crecer tu dinero con <em>proyectos inmobiliarios</em></h1>
          <p>Accedé a oportunidades inmobiliarias e invertí en propiedades junto a otros inversores, sin necesidad de financiar proyectos completos.</p>
          <a class="btn-cta" href="#proyectos">
            Explorar oportunidades
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <ul class="datos">
          <li>Inversión inmobiliaria online: explora y simula desde la web, y un asesor te acompaña para concretar.</li>
          <li>Inversión mínima - Desde USD 100.</li>
          <li>Retorno potencial - Según cada proyecto.</li>
          <li>Proyectos inmobiliarios - Viviendas, edificios y más</li>
        </ul>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative; min-height: 900px; overflow: hidden;
      display: flex; align-items: center; padding-top: 140px;
      background:
        linear-gradient(1.97deg, rgba(53, 213, 192, .2) 5.61%, rgba(16, 42, 42, .2) 44.2%),
        var(--verde-oscuro);
    }
    .foto {
      position: absolute; top: 0; right: 0; bottom: 0; width: min(56%, 1040px);
      background: var(--img-ciudad) center 38% / cover,
                  linear-gradient(200deg, #1b2b33, #0d1a1c);
      border-radius: clamp(180px, 21vw, 320px) 0 0 0;
    }
    .texto { position: relative; width: 100%; display: flex; flex-direction: column; gap: 72px; }
    .principal { display: flex; flex-direction: column; align-items: flex-start; gap: 28px; max-width: 640px; }
    h1 { font-size: clamp(34px, 4vw, 52px); line-height: 1.06; font-weight: 300; }
    h1 em { color: var(--turquesa); font-style: italic; font-weight: 400; }
    .principal p { font-size: 20px; line-height: 24px; max-width: 469px; }
    .principal .btn-cta { margin-top: 12px; }
    .datos { list-style: none; margin: 0; padding: 0; width: 288px; display: grid; gap: 10px; color: var(--turquesa-claro); font-size: 12px; line-height: 16px; }
    @media (max-width: 900px) {
      .hero { min-height: 760px; padding-top: 170px; }
      .foto { opacity: .25; width: 100%; border-radius: 200px 0 0 0; }
      .texto { gap: 48px; }
    }
  `,
})
export class HeroComponent {}
