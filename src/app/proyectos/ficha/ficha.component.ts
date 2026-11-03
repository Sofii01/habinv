import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Proyecto, detalles, porSlug, ubicacion } from '../proyectos.data';
import { SimuladorComponent } from '../../simulador/simulador.component';
import { ContactoComponent } from '../../contacto/contacto.component';
import { ProyectosComponent } from '../proyectos.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-ficha',
  imports: [RouterLink, SimuladorComponent, ContactoComponent, ProyectosComponent, FooterComponent],
  template: `
    @if (proyecto) {
      <article class="ficha">
        <section class="bloque encabezado">
          <div class="contenedor fila">
            <div class="texto">
              <div>
                <h1 class="nombre">{{ proyecto.nombre }}</h1>
                <p class="ubicacion">{{ ubicacion(proyecto) }}</p>
              </div>
              <p class="descripcion">{{ proyecto.descripcion }}</p>
              <a class="btn-cta" href="#simulador">
                Simular Inversión
                <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
            <img class="foto marco" [src]="proyecto.galeria[0]" [alt]="proyecto.nombre" width="927" height="800">
          </div>
        </section>

        <section class="bloque galeria">
          <div class="contenedor">
            <div class="foto-grande">
              <img class="foto" [src]="carrusel[fotoIdx()]" [alt]="proyecto.nombre + ' — foto ' + (fotoIdx() + 1) + ' de ' + carrusel.length">
              @if (fotoIdx() > 0) {
                <button type="button" class="nav anterior" (click)="moverFoto(-1)" aria-label="Foto anterior">
                  <svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg>
                </button>
              }
              @if (fotoIdx() < carrusel.length - 1) {
                <button type="button" class="nav siguiente" (click)="moverFoto(1)" aria-label="Foto siguiente">
                  <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>
                </button>
              }
            </div>
          </div>
        </section>

        <section class="bloque potencial">
          <div class="contenedor texto">
            <h2>Ubicación y potencial estratégico</h2>
            <p>{{ proyecto.potencial }}</p>
            <a class="btn-cta" href="#simulador">
              Simular Inversión
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </section>

        <section class="bloque detalle">
          <div class="contenedor fila">
            <img class="foto marco" [src]="proyecto.fotoDetalle ?? proyecto.img" [alt]="proyecto.nombre" loading="lazy" width="927" height="800">
            <dl>
              @for (d of detalles(proyecto); track d.label) {
                <div><dt>{{ d.label }}</dt><dd>{{ d.valor }}</dd></div>
              }
            </dl>
          </div>
        </section>

        <app-simulador [proyecto]="proyecto" />
        <app-contacto [proyecto]="proyecto" />
        <app-proyectos [excluir]="proyecto.slug" />
        <app-footer />
      </article>
    } @else {
      <section class="seccion no-encontrado">
        <div class="contenedor">
          <p>No encontramos ese proyecto.</p>
          <a class="btn-cta" routerLink="/">Volver al inicio</a>
        </div>
      </section>
    }
  `,
  styles: `
    .ficha { display: block; }
    .bloque { padding-top: 80px; padding-bottom: 80px; background: var(--crema); color: var(--verde-oscuro); }
    .encabezado { padding-top: 160px; }

    .fila {
      display: grid; grid-template-columns: minmax(0, 460px) minmax(0, 927px);
      justify-content: space-between; align-items: start; gap: 48px;
    }

    .texto { display: grid; justify-items: start; gap: 40px; }
    .nombre { font-size: clamp(32px, 3.2vw, 44px); line-height: 1.1; font-weight: 300; }
    .ubicacion { margin-top: 8px; font-size: clamp(22px, 1.9vw, 28px); line-height: 1.2; font-style: italic; color: var(--turquesa); }
    .descripcion { margin-top: -8px; font-size: 19px; line-height: 24px; }

    .foto { display: block; width: 100%; height: 100%; object-fit: cover; }
    .marco { aspect-ratio: 927 / 800; border-radius: 0 80px 0 80px; }

    .foto-grande {
      position: relative; aspect-ratio: 1448 / 800;
      border-radius: 0 80px 0 80px; overflow: hidden; background: var(--verde-panel);
    }
    .nav {
      position: absolute; top: 50%; transform: translateY(-50%);
      display: grid; place-items: center; width: 52px; height: 52px; padding: 0;
      background: rgba(16, 42, 42, .65); border: 0; border-radius: 14px; cursor: pointer; color: var(--blanco);
      backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); transition: background .2s;
    }
    .anterior { left: 80px; }
    .siguiente { right: 80px; }
    .nav svg { width: 26px; height: 26px; stroke: currentColor; fill: none; stroke-width: 2; }
    .nav:hover { background: rgba(16, 42, 42, .85); }
    .nav:focus-visible { outline: 3px solid var(--turquesa); outline-offset: 2px; }

    .potencial .texto { max-width: 460px; justify-items: center; gap: 32px; text-align: center; }
    .potencial h2 { font-size: clamp(22px, 2vw, 26px); line-height: 1.2; font-weight: 400; }
    .potencial p { max-width: 440px; font-size: 18px; line-height: 24px; }

    .detalle .fila { grid-template-columns: minmax(0, 927px) minmax(0, 460px); align-items: center; }
    .detalle dl { margin: 0; }
    .detalle dl div { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; font-size: 19px; line-height: 24px; }
    .detalle dl div + div { border-top: 1px solid var(--turquesa-claro); }
    .detalle dt, .detalle dd { margin: 0; }
    .detalle dd { text-align: right; }

    .no-encontrado { padding-top: 158px; padding-bottom: 120px; background: var(--crema); color: var(--verde-oscuro); text-align: center; display: grid; gap: 24px; justify-content: center; }

    @media (max-width: 900px) {
      .bloque { padding-top: 48px; padding-bottom: 48px; }
      .encabezado { padding-top: 136px; }
      .fila, .detalle .fila { grid-template-columns: 1fr; gap: 32px; }
      .texto { gap: 28px; }
      .marco, .foto-grande { border-radius: 0 56px 0 56px; }
      .foto-grande { aspect-ratio: 4 / 3; }
      .anterior { left: 16px; }
      .siguiente { right: 16px; }
      .nav { width: 44px; height: 44px; border-radius: 12px; }
    }
  `,
})
export class FichaComponent implements OnChanges {
  @Input() slug = '';
  proyecto: Proyecto | undefined;
  /** Fotos del carrusel: arranca en la segunda (la primera ya está en el encabezado) y la deja al final. */
  carrusel: string[] = [];

  detalles = detalles;
  ubicacion = ubicacion;

  fotoIdx = signal(0);

  moverFoto(paso: number) {
    this.fotoIdx.update(i => Math.min(this.carrusel.length - 1, Math.max(0, i + paso)));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slug']) {
      this.proyecto = porSlug(this.slug);
      const g = this.proyecto?.galeria ?? [];
      this.carrusel = g.length > 1 ? [...g.slice(1), g[0]] : g;
      this.fotoIdx.set(0);
    }
  }
}
