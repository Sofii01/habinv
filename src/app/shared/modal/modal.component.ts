import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    @if (abierto) {
      <div class="fondo" [class.completo]="variante === 'completo'" (click)="onFondoClick($event)">
        <div class="panel" [class.completo]="variante === 'completo'" role="dialog" aria-modal="true" [attr.aria-label]="ariaLabel || null">
          <div class="cierre">
            <button type="button" class="btn-cerrar" (click)="cerrar.emit()" aria-label="Cerrar">
              <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>
            </button>
          </div>
          <ng-content />
        </div>
      </div>
    }
  `,
  styles: `
    .fondo {
      position: fixed; inset: 0; z-index: 100; display: grid; place-items: center;
      padding: 24px; background: rgba(8, 20, 20, .6); backdrop-filter: blur(2px);
    }
    .fondo.completo { padding: 0; }
    .panel {
      max-width: 500px; width: 100%; max-height: calc(100vh - 48px); overflow: auto;
      padding: 28px 0 60px; background: var(--verde-oscuro); color: var(--crema);
      box-shadow: 0 4px 68px 5px rgba(0, 0, 0, .3);
      border-radius: 80px 0 80px 0;
    }
    .panel.completo {
      max-width: none; max-height: 100vh; height: 100vh; padding: 0; border-radius: 0;
    }
    .cierre { display: flex; justify-content: flex-end; padding: 0 30px; }
    .panel.completo .cierre {
      position: sticky; top: 0; z-index: 1; padding: 16px 20px;
      background: rgba(16, 42, 42, .55); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }
    .btn-cerrar {
      display: grid; place-items: center; width: 52px; height: 52px; padding: 16px;
      background: none; border: 0; border-radius: 100px; cursor: pointer; color: var(--blanco);
    }
    .btn-cerrar svg { width: 24px; height: 24px; stroke: currentColor; fill: none; stroke-width: 2; }
    .btn-cerrar:hover { color: var(--turquesa); }
    .btn-cerrar:focus-visible { outline: 3px solid var(--turquesa-claro); outline-offset: 2px; }

    @media (max-width: 560px) {
      .panel { border-radius: 56px 0 56px 0; }
      .panel.completo { border-radius: 0; }
    }
  `,
})
export class ModalComponent {
  @Input() abierto = false;
  @Input() ariaLabel = '';
  @Input() variante: 'centro' | 'completo' = 'centro';
  @Output() cerrar = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.abierto) this.cerrar.emit();
  }

  onFondoClick(e: MouseEvent) {
    if (e.target === e.currentTarget) this.cerrar.emit();
  }
}
