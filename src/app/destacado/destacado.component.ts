import { Component, computed, signal } from '@angular/core';
import { PROYECTOS, detalles, ubicacion } from '../proyectos/proyectos.data';

@Component({
  selector: 'app-destacado',
  template: `
    <section id="destacado" class="seccion">
      <div class="contenedor">
        <div class="intro">
          <h2 class="titulo">Oportunidades que vale la pena <em>mirar de cerca</em></h2>
          <p>Conoce un proyecto pensado para el inversor inmobiliario que busca generar valor, y descubre cómo puedes entrar.</p>
        </div>

        <div class="slide" role="group" aria-roledescription="carrusel" [attr.aria-label]="'Proyecto ' + (idx() + 1) + ' de ' + proyectos.length">
          <img class="fondo" [src]="actual().img" alt="" loading="lazy" width="1800" height="1125">
          <div class="velo"></div>

          <div class="info">
            <h3>{{ actual().nombre }}</h3>
            <p class="ubicacion">{{ ubicacion(actual()) }}</p>
            <p class="desc">{{ actual().descripcion }}</p>
            <dl>
              @for (d of detalles(actual()); track d.label) {
                <div><dt>{{ d.label }}</dt><dd>{{ d.valor }}</dd></div>
              }
            </dl>
            <a class="btn-cta" href="#simulador">
              Simular inversión
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>

          @if (idx() > 0) {
            <button type="button" class="nav prev" (click)="mover(-1)" aria-label="Proyecto anterior">
              <svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg>
            </button>
          }
          @if (idx() < proyectos.length - 1) {
            <button type="button" class="nav next" (click)="mover(1)" aria-label="Proyecto siguiente">
              <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>
            </button>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .seccion { padding-top: 120px; padding-bottom: 120px; background: var(--crema); color: var(--texto-btn); }

    .intro { max-width: 560px; margin: 0 auto 72px; text-align: center; display: grid; gap: 28px; }
    .intro .titulo em { color: var(--verde); font-style: italic; font-weight: 400; }
    .intro p { font-size: 18px; line-height: 22px; max-width: 474px; margin: 0 auto; }

    .slide {
      position: relative; display: flex; align-items: center; overflow: hidden;
      min-height: 881px; padding: 140px clamp(28px, 5.5%, 80px);
      border-radius: 0 80px 0 80px; background: var(--verde-oscuro); color: var(--crema);
    }
    .fondo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    .velo { position: absolute; inset: 0; background: #102A2AB2; }

    .info { position: relative; display: grid; justify-items: start; max-width: 570px; }
    h3 { font-size: clamp(30px, 3.2vw, 44px); line-height: 1.1; font-weight: 300; color: var(--blanco); }
    .ubicacion { margin-top: 4px; font-size: clamp(22px, 2vw, 30px); line-height: 1.2; font-style: italic; color: var(--turquesa); }
    .desc { margin-top: 28px; font-size: 18px; line-height: 22px; }

    dl { margin: 36px 0 0; width: 100%; }
    dl div {
      display: flex; justify-content: space-between; align-items: baseline; gap: 16px;
      padding: 10px 0; border-bottom: 1px solid var(--turquesa-claro); font-size: 16px; line-height: 20px;
    }
    dt, dd { margin: 0; }
    dd { text-align: right; }
    .info .btn-cta { margin-top: 40px; }

    .nav {
      position: absolute; top: 50%; transform: translateY(-50%); z-index: 1;
      display: grid; place-items: center; width: 56px; height: 56px; padding: 0;
      background: none; border: 0; border-radius: 50%; cursor: pointer; color: var(--blanco);
    }
    .nav svg { width: 30px; height: 30px; fill: none; stroke: currentColor; stroke-width: 1.5; }
    .nav:hover { color: var(--turquesa); }
    .nav:focus-visible { outline: 3px solid var(--turquesa); outline-offset: 2px; }
    .prev { left: clamp(4px, 2%, 24px); }
    .next { right: clamp(8px, 5%, 64px); }

    @media (max-width: 860px) {
      .slide { min-height: 0; padding: 48px 28px 48px 24px; border-radius: 0 56px 0 56px; }
      .info { max-width: none; }
      .nav { top: auto; bottom: 16px; transform: none; width: 44px; height: 44px; }
    }
  `,
})
export class DestacadoComponent {
  proyectos = PROYECTOS;
  idx = signal(1); // Nova Comfort
  actual = computed(() => this.proyectos[this.idx()]);

  detalles = detalles;
  ubicacion = ubicacion;

  mover(paso: number) {
    this.idx.update(i => Math.min(this.proyectos.length - 1, Math.max(0, i + paso)));
  }
}
