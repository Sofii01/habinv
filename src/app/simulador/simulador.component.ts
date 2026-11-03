import { Component, computed, Input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PROYECTOS, Proyecto, plazo } from '../proyectos/proyectos.data';

@Component({
  selector: 'app-simulador',
  imports: [DecimalPipe],
  template: `
    <section [id]="id" class="seccion">
      <div class="contenedor">
        <div class="intro">
          <h2 class="titulo">¿Quieres saber con <em>cuánto podrías quedarte</em>?</h2>
          <p>Las inversiones inmobiliarias rentables se eligen con números claros. Si estás viendo en qué invertir con poco capital, prueba distintos montos antes de decidir.</p>
        </div>

        @if (!fijo()) {
          <div class="proyectos">
            @for (p of proyectos; track p.nombre; let i = $index) {
              <button type="button" [attr.aria-pressed]="i === idx()" [class.activo]="i === idx()" (click)="idx.set(i)">
                <strong>{{ p.nombre }}</strong>
                <span>{{ p.ciudad }} · {{ p.tasa }}% anual · {{ plazo(p) }}</span>
              </button>
            }
          </div>
        }

        <div class="monto-retorno">
          <label class="bloque">
            <span class="label">Quieres invertir</span>
            <span class="input">
              <input type="number" [min]="min" [max]="max" [value]="monto()" (input)="setMonto($any($event.target).value)">
              <span class="moneda">USD</span>
            </span>
          </label>
          <span class="flecha" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
          <div class="bloque retorno">
            <span class="label">Podrías recibir</span>
            <span class="total"><b>{{ total() | number:'1.0-0' }}</b> USD</span>
            <span class="periodo">en {{ plazo(actual()) }}</span>
          </div>
        </div>

        <div class="slider" [style.--pct]="pct() + '%'" [style.--f]="frac()">
          <output class="globo">{{ monto() | number:'1.0-0' }} USD</output>
          <input type="range" [min]="min" [max]="max" step="50" [value]="monto()"
                 (input)="setMonto($any($event.target).value)" aria-label="Monto a invertir">
          <div class="marcas">
            <span>100 USD</span><span>2.500</span><span>5.000</span><span>7.500</span><span>10.000 USD</span>
          </div>
        </div>

        <div class="detalle">
          <div><small>Inversión</small><strong>{{ monto() | number:'1.0-0' }} USD</strong></div>
          <div><small>Ganancia estimada</small><strong>+{{ ganancia() | number:'1.0-2' }} USD</strong></div>
          <div><small>Retorno estimado</small><strong class="neutro">{{ actual().tasa }}% anual</strong></div>
          <div><small>Plazo</small><strong class="neutro">{{ plazo(actual()) }}</strong></div>
          <a class="btn-cta" href="#contacto">
            Quiero invertir
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <p class="aviso">Estimación basada en el retorno proyectado del proyecto. La rentabilidad no está garantizada.</p>
      </div>
    </section>
  `,
  styles: `
    .seccion { background: var(--crema); color: var(--texto-btn); padding-top: 120px; padding-bottom: 120px; }

    .intro { max-width: 560px; margin: 0 auto 72px; text-align: center; display: grid; gap: 28px; }
    .intro .titulo em { color: var(--verde); font-style: italic; font-weight: 400; }
    .intro p { font-size: 18px; line-height: 22px; max-width: 474px; margin: 0 auto; }

    .proyectos { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; margin-bottom: 64px; }
    .proyectos button {
      all: unset; box-sizing: border-box; cursor: pointer; display: flex; flex-direction: column; gap: 8px;
      padding: 20px 26px; border: 1px solid var(--gris); border-radius: 12px; background: transparent;
    }
    .proyectos button:focus-visible { outline: 3px solid var(--turquesa); outline-offset: 2px; }
    .proyectos button.activo { background: #DFE7E3; border: 2px solid var(--verde); padding: 19px 25px; }
    .proyectos strong { font: italic 400 26px/28px var(--font); }
    .proyectos .activo strong { color: var(--verde); }
    .proyectos span { font-size: 16px; line-height: 20px; }

    .monto-retorno { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 32px; }
    .bloque { display: flex; flex-direction: column; gap: 14px; }
    .label { font-size: 26px; line-height: 28px; }
    .input {
      display: flex; align-items: center; gap: 12px; width: 440px; max-width: 100%; padding: 18px 28px;
      background: var(--blanco); border: 1px solid #D3DAD8; border-radius: 16px;
    }
    .input input {
      all: unset; width: 100%; min-width: 0; color: var(--verde-oscuro); -moz-appearance: textfield;
      font: italic 400 76px/88px var(--font); letter-spacing: .01em;
    }
    .input input::-webkit-outer-spin-button, .input input::-webkit-inner-spin-button { appearance: none; margin: 0; }
    .moneda { font: italic 400 40px/40px var(--font); color: #6B7675; }
    .flecha svg { width: 46px; height: 32px; fill: none; stroke: var(--texto-btn); stroke-width: 1.5; }
    .retorno { align-items: flex-end; }
    .total { display: flex; align-items: baseline; gap: 10px; color: var(--verde); font: italic 400 36px/40px var(--font); }
    .periodo { margin-top: -6px; font: italic 400 18px/22px var(--font); color: var(--texto-btn); }
    .total b { font-weight: 400; font-size: 76px; line-height: 88px; }

    .slider { position: relative; margin: 72px 0 56px; }
    .globo {
      position: absolute; bottom: calc(100% - 4px); left: calc(var(--f) * (100% - 28px) + 14px);
      transform: translateX(-50%); padding: 7px 14px; border-radius: 8px;
      background: var(--verde-oscuro); color: var(--blanco); font-size: 15px; line-height: 18px; white-space: nowrap;
    }
    .globo::after {
      content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
      border: 6px solid transparent; border-top-color: var(--verde-oscuro); border-bottom: 0;
    }
    .slider input { display: block; width: 100%; height: 28px; appearance: none; background: transparent; cursor: pointer; }
    .slider input::-webkit-slider-runnable-track {
      height: 6px; border-radius: 100px;
      background: linear-gradient(90deg, var(--turquesa) var(--pct), var(--gris) var(--pct));
    }
    .slider input::-moz-range-track { height: 6px; border-radius: 100px; background: var(--gris); }
    .slider input::-moz-range-progress { height: 6px; border-radius: 100px; background: var(--turquesa); }
    .slider input::-webkit-slider-thumb {
      appearance: none; width: 28px; height: 28px; margin-top: -11px; border-radius: 50%;
      border: 3px solid var(--turquesa);
      background: radial-gradient(circle, var(--turquesa) 0 4px, var(--blanco) 4px 100%);
    }
    .slider input::-moz-range-thumb {
      width: 22px; height: 22px; border-radius: 50%; border: 3px solid var(--turquesa);
      background: radial-gradient(circle, var(--turquesa) 0 4px, var(--blanco) 4px 100%);
    }
    .slider input:focus-visible { outline: none; }
    .slider input:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px rgba(53, 213, 192, .4); }
    .marcas { display: flex; justify-content: space-between; margin-top: 10px; font: italic 400 15px/18px var(--font); }
    .marcas span { position: relative; padding-top: 14px; }
    .marcas span::before { content: ''; position: absolute; top: 0; left: 50%; width: 1px; height: 8px; background: var(--gris); }
    .marcas span:first-child::before { left: 0; }
    .marcas span:last-child::before { left: auto; right: 0; }

    .detalle {
      display: flex; flex-wrap: wrap; align-items: center; gap: 24px 0;
      padding: 26px 32px; background: var(--gris-panel); border-radius: 16px 16px 16px 40px;
    }
    .detalle div { flex: 1 1 170px; display: flex; flex-direction: column; gap: 8px; padding: 0 24px; }
    .detalle div:first-child { padding-left: 0; }
    .detalle div + div { border-left: 1px solid var(--verde); }
    .detalle small { font-size: 13px; line-height: 16px; color: #41504E; }
    .detalle strong { font: italic 400 22px/26px var(--font); color: var(--verde); }
    .detalle strong.neutro { font-style: normal; font-weight: 300; color: var(--texto-btn); }
    .detalle .btn-cta { flex: 0 0 auto; margin-left: 24px; min-height: 50px; padding: 13px 24px; font-size: 18px; }
    .detalle .btn-cta svg { width: 18px; height: 18px; }

    .aviso { margin-top: 20px; text-align: center; font-size: 16px; line-height: 20px; color: var(--verde); }

    @media (max-width: 900px) {
      .input input { font-size: 48px; line-height: 56px; }
      .moneda { font-size: 28px; }
      .total b { font-size: 48px; line-height: 56px; }
      .total { font-size: 26px; }
      .flecha { display: none; }
      .retorno { align-items: flex-start; }
      .detalle div { flex-basis: 140px; padding: 0 16px; }
      .detalle .btn-cta { margin: 8px 0 0 16px; }
    }
  `,
})
export class SimuladorComponent {
  @Input() id = 'simulador';

  readonly min = 100;
  readonly max = 10000;
  proyectos = PROYECTOS;
  plazo = plazo;

  @Input() set proyecto(p: Proyecto | undefined) { this.fijo.set(p); }
  fijo = signal<Proyecto | undefined>(undefined);

  idx = signal(1);
  monto = signal(500);
  actual = computed(() => this.fijo() ?? this.proyectos[this.idx()]);
  ganancia = computed(() => this.monto() * (this.actual().tasa / 100) * (this.actual().meses / 12));
  total = computed(() => this.monto() + this.ganancia());
  frac = computed(() => (this.monto() - this.min) / (this.max - this.min));
  pct = computed(() => this.frac() * 100);

  setMonto(v: string | number) {
    const n = Math.round(Number(v) || this.min);
    this.monto.set(Math.min(this.max, Math.max(this.min, n)));
  }
}
