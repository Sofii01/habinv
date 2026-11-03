import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROYECTOS, detalles, ubicacion } from './proyectos.data';

@Component({
  selector: 'app-proyectos',
  imports: [RouterLink],
  template: `
    <section [id]="id" class="seccion">
      <div class="contenedor">
        <div class="intro">
          <h2 class="titulo">Encuentra tu próxima oportunidad de <em>inversión inmobiliaria</em></h2>
          <p>Explora propiedades de inversión y proyectos inmobiliarios para invertir: conoce cuánto necesitas, su retorno potencial y en qué etapa se encuentran.</p>
        </div>
        <div class="lista">
          @for (p of proyectos; track p.nombre) {
            <article class="card">
              <div class="foto">
                <img [src]="p.img" [alt]="p.nombre" loading="lazy" width="1800" height="1125">
                <span class="contador">01/{{ p.galeria.length }} fotos</span>
              </div>
              <div class="info">
                <header>
                  <h3>{{ p.nombre }}</h3>
                  <p class="ubicacion">{{ ubicacion(p) }}</p>
                </header>
                <dl>
                  @for (d of detalles(p); track d.label) {
                    <div><dt>{{ d.label }}</dt><dd>{{ d.valor }}</dd></div>
                  }
                </dl>
                <a class="btn-cta btn-chico" [routerLink]="['/proyecto', p.slug]">
                  Ver proyecto
                  <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .seccion { padding-top: 120px; padding-bottom: 120px; background: var(--verde-oscuro); }

    .intro { max-width: 560px; margin: 0 auto 88px; text-align: center; display: grid; gap: 28px; }
    .intro .titulo em { color: var(--turquesa); font-style: italic; font-weight: 400; }
    .intro p { font-size: 18px; line-height: 22px; max-width: 474px; margin: 0 auto; }

    .lista { display: grid; gap: 40px; }
    .card {
      display: grid; grid-template-columns: 53.6% 1fr; gap: 32px;
      min-height: 563px; padding: 40px; background: var(--verde-panel); border-radius: 0 80px 0 80px;
    }

    .foto { position: relative; border-radius: 20px 60px 20px 60px; overflow: hidden; }
    .foto img { display: block; width: 100%; height: 100%; object-fit: cover; }
    .contador {
      position: absolute; top: 26px; left: 26px; padding: 9px 18px; border-radius: 100px;
      background: rgba(16, 42, 42, .55); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      font-size: 16px; line-height: 20px; color: var(--blanco);
    }

    .info { display: flex; flex-direction: column; justify-content: center; gap: 36px; padding-right: 8px; }
    h3 { font-size: clamp(28px, 3vw, 42px); line-height: 1.1; font-style: italic; font-weight: 400; color: var(--blanco); }
    .ubicacion { margin-top: 6px; font-size: clamp(20px, 1.8vw, 24px); line-height: 1.2; color: var(--turquesa); }

    dl { margin: 0; }
    dl div {
      display: flex; justify-content: space-between; align-items: baseline; gap: 16px;
      padding: 11px 0; border-bottom: 1px solid var(--verde); font-size: 16px; line-height: 20px;
    }
    dl div:first-child { border-top: 1px solid var(--verde); }
    dt, dd { margin: 0; }
    dt { color: var(--gris); }
    dd { color: var(--crema); text-align: right; }

    .btn-chico { align-self: flex-end; min-height: 48px; padding: 12px 22px; font-size: 18px; }
    .btn-chico svg { width: 18px; height: 18px; }

    @media (max-width: 1000px) {
      .card { grid-template-columns: 1fr; gap: 28px; min-height: 0; padding: 20px; border-radius: 0 56px 0 56px; }
      .foto { aspect-ratio: 16 / 10; border-radius: 16px 44px 16px 44px; }
      .info { padding-right: 0; gap: 28px; }
      .btn-chico { align-self: flex-start; }
    }
  `,
})
export class ProyectosComponent {
  @Input() id = 'proyectos';
  /** Slug a omitir de la lista (en la ficha, el proyecto que ya se está viendo). */
  @Input() excluir = '';

  get proyectos() { return PROYECTOS.filter(p => p.slug !== this.excluir); }
  detalles = detalles;
  ubicacion = ubicacion;
}
