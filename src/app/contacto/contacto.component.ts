import { Component, Input, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PAISES_TELEFONO } from './paises.data';
import { PROYECTOS, Proyecto } from '../proyectos/proyectos.data';
import { environment } from '../../environments/environment';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, ModalComponent],
  template: `
    <section [id]="id" class="seccion">
      <div class="fondo-img" [style.--img-contacto]="img ? 'url(' + img + ')' : null"></div>
      <div class="contenedor">
        <form class="form" #f="ngForm" (ngSubmit)="enviar(f)" novalidate>
          <div class="texto">
            <h2 class="titulo">¿Estás listo para empezar a <em>invertir</em>?</h2>
            <p>Déjanos tus datos y un asesor te guía paso a paso. No necesitas experiencia previa.</p>
          </div>

          <div class="fila">
            <label>Nombre
              <input name="nombre" ngModel required placeholder="Tu nombre">
            </label>
            <div class="campo">
              <label for="contacto-telefono">Teléfono</label>
              <div class="telefono">
                <span class="prefijo">
                  <span aria-hidden="true">+{{ codigo }}</span>
                  <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                  <select name="codigo" [(ngModel)]="codigo" aria-label="Código de país">
                    @for (p of codigos; track p.codigo) { <option [value]="p.codigo">{{ p.pais }} (+{{ p.codigo }})</option> }
                  </select>
                </span>
                <input id="contacto-telefono" name="telefono" type="tel" ngModel required placeholder="9 351 000 0000">
              </div>
            </div>
          </div>
          <label>Correo electrónico
            <input name="email" type="email" ngModel required email placeholder="nombre@correo.com">
          </label>
          <div class="campo">
            <label for="contacto-proyecto">Proyecto de interés</label>
            <div class="selector-proyecto">
              @if (seleccionado(); as p) {
                <img [src]="p.img" alt="" width="44" height="44" loading="lazy">
                <span class="datos" aria-hidden="true">
                  <strong>{{ p.nombre }}</strong>
                  <span>{{ p.ciudad }}, {{ p.pais }}</span>
                  <span class="desde">Desde {{ p.desde }}</span>
                </span>
              }
              <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
              <select id="contacto-proyecto" name="proyecto" [(ngModel)]="proyectoNombre">
                @for (p of proyectos; track p.nombre) { <option [value]="p.nombre">{{ p.nombre }}</option> }
              </select>
            </div>
          </div>

          <button class="btn-cta" type="submit" [disabled]="enviando()">
            {{ enviando() ? 'Enviando...' : 'Explorar oportunidades' }}
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
          @if (f.submitted && f.invalid) { <p class="error" role="alert">Completá los campos marcados para continuar.</p> }
          @if (error()) { <p class="error" role="alert">No pudimos enviar tus datos. Probá de nuevo.</p> }
          <p class="nota">Sin compromiso. Registrar tu interés no te obliga a invertir.</p>
        </form>
      </div>
    </section>

    <app-modal [abierto]="enviado()" (cerrar)="enviado.set(false)" ariaLabel="Solicitud recibida">
      <div class="confirmacion">
        <h3 class="titulo">¡Listo! <br><span class="acento">Recibimos tu solicitud.</span></h3>
        <p class="texto">Un asesor se pondrá en contacto contigo para informarte.</p>
      </div>
    </app-modal>
  `,
  styles: `
    .seccion { position: relative; padding-top: 158px; padding-bottom: 120px; overflow: hidden; background: var(--verde-oscuro); }
    .fondo-img {
      position: absolute; top: 0; right: 0; width: 49%; height: 100%;
    }

    .fondo-img::before {
      content: ''; position: absolute; inset: 0 0 0 -2%;
      background: linear-gradient(360deg, rgba(53, 213, 192, .4) 0%, rgba(16, 42, 42, .4) 81.73%);
      -webkit-mask-image: linear-gradient(to right, transparent, #000 4%);
      mask-image: linear-gradient(to right, transparent, #000 4%);
    }

    .fondo-img::after {
      content: ''; position: absolute; inset: 0;
      background: var(--img-contacto, var(--img-ciudad)) center / cover;
      border-top-left-radius: 100% 100%;
    }
    .contenedor { position: relative; }
    .form { max-width: 576px; display: flex; flex-direction: column; gap: 20px; }
    .texto { display: grid; gap: 28px; margin-bottom: 28px; }
    .titulo em { color: var(--turquesa); }
    .texto p { font-size: 20px; line-height: 24px; }
    .fila { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; }
    label { display: flex; flex-direction: column; gap: 10px; font-size: 16px; color: #DCE4E1; }
    input, select { padding: 16px 20px; background: var(--verde-oscuro); border: 1px solid #4C5F5F; border-radius: 20px 4px; color: var(--crema); font: 300 16px/16px var(--font); letter-spacing: .02em; }
    input::placeholder { color: #929595; }
    input:focus, select:focus { outline: none; border: 1.5px solid var(--turquesa-btn); background: #0D2222; }
    .campo { display: flex; flex-direction: column; gap: 10px; }
    .chevron { width: 16px; height: 16px; flex: none; fill: none; stroke: var(--turquesa); stroke-width: 2; }

    .telefono, .selector-proyecto {
      position: relative; display: flex; align-items: center;
      background: var(--verde-oscuro); border: 1px solid #4C5F5F; border-radius: 20px 4px;
    }
    .telefono:focus-within, .selector-proyecto:focus-within { border: 1.5px solid var(--turquesa-btn); background: #0D2222; }
    .telefono input { flex: 1; min-width: 0; border: 0; background: transparent; }
    .telefono input:focus { border: 0; background: transparent; }
    .prefijo {
      position: relative; display: flex; align-items: center; gap: 8px; padding: 0 14px 0 20px;
      font-size: 16px; color: var(--crema); border-right: 1px solid #4C5F5F;
    }
    .prefijo select, .selector-proyecto select {
      position: absolute; inset: 0; width: 100%; opacity: 0; cursor: pointer; padding: 0; border: 0;
    }
    .prefijo select option, .selector-proyecto select option { color: initial; }

    .selector-proyecto { gap: 14px; min-height: 84px; padding: 12px 20px 12px 16px; }
    .selector-proyecto img { width: 52px; height: 52px; flex: none; object-fit: cover; border-radius: 8px 2px; }
    .datos { flex: 1; display: grid; gap: 2px; font-size: 13px; line-height: 16px; color: #DCE4E1; }
    .datos strong { font: italic 400 17px/22px var(--font); color: var(--blanco); }
    .datos .desde { color: var(--turquesa); }
    .btn-cta { width: 100%; max-width: 576px; height: 58px; margin-top: 8px; color: var(--verde-oscuro); }
    input.ng-invalid.ng-touched { border-color: #E5736A; }
    .error { color: #E5736A; text-align: center; }
    .nota { text-align: center; font-style: italic; font-size: 16px; color: var(--turquesa-claro); }

    .confirmacion { padding: 0 56px; display: grid; justify-items: center; gap: 28px; text-align: center; }
    .confirmacion .titulo { margin: 0; font-size: 44px; line-height: 48px; font-weight: 300; color: var(--crema); }
    .confirmacion .acento { color: var(--turquesa); }
    .confirmacion .texto { margin: 0; font-size: 20px; line-height: 24px; font-style: italic; color: var(--crema); }

    @media (max-width: 700px) { .fila { grid-template-columns: 1fr; } .fondo-img { opacity: .2; width: 100%; } }
    @media (max-width: 560px) {
      .confirmacion { padding: 0 24px; }
      .confirmacion .titulo { font-size: 32px; line-height: 36px; }
    }
  `,
})
export class ContactoComponent {
  @Input() id = 'contacto';

  @Input() set proyecto(p: Proyecto | undefined) {
    if (!p) return;
    this.proyectoNombre = p.nombre;
    this.img = p.fotoContacto ?? p.galeria[3 % p.galeria.length];
  }

  readonly codigos = [...PAISES_TELEFONO].sort((a, b) => a.pais.localeCompare(b.pais, 'es'));
  readonly proyectos = PROYECTOS;
  codigo = '54';
  proyectoNombre = 'Nova Comfort';
  img = '';

  seleccionado = () => this.proyectos.find(p => p.nombre === this.proyectoNombre);

  enviado = signal(false);
  enviando = signal(false);
  error = signal(false);

  async enviar(f: NgForm) {
    if (f.invalid) {
      f.control.markAllAsTouched();
      return;
    }

    const { nombre, telefono, email, proyecto } = f.value;
    const datos = {
      nombre,
      telefono: `+${this.codigo} ${telefono}`,
      email,
      pais: PAISES_TELEFONO.find(p => p.codigo === this.codigo)?.pais ?? '',
      proyecto,
    };

    if (!environment.googleSheetsEndpoint) {
      console.log('Contacto (falta configurar googleSheetsEndpoint en environment)', datos);
      this.enviado.set(true);
      return;
    }

    this.enviando.set(true);
    this.error.set(false);

    try {
      await fetch(environment.googleSheetsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(datos),
      });
      this.enviado.set(true);
    } catch {
      this.error.set(true);
    } finally {
      this.enviando.set(false);
    }
  }
}

