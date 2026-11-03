import { Component, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <header class="wrap" [class.compacto]="compacto()" [class.solido]="!enInicio()">
      <nav class="navbar" aria-label="Principal">
        <a class="marca" routerLink="/" fragment="inicio" aria-label="Habinv, ir al inicio">
          <img class="logo" src="/img/logo-habinv.png" alt="Habinv" width="181" height="40">
        </a>
        <ul>
          <li><a routerLink="/" fragment="como-funciona">¿Cómo funciona?</a></li>
          <li><a routerLink="/" fragment="proyectos">Proyectos</a></li>
          <li><a routerLink="/" fragment="simulador">Simulador de inversión</a></li>
          <li><a routerLink="/" fragment="contacto">Contacto</a></li>
        </ul>
        <a class="btn-cta" routerLink="/" fragment="contacto">
          Quiero invertir
          <svg viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </nav>
    </header>
  `,
  styles: `
    .wrap {
      position: fixed; top: 40px; left: 0; right: 0; padding: 0 var(--pad-x); z-index: 100;
      transition: top .25s ease;
    }
    .wrap.compacto { top: 12px; }
    .navbar {
      max-width: 1448px; margin: 0 auto; height: 80px; padding: 12px 12px 12px 28px;
      display: flex; align-items: center; justify-content: space-between; gap: 24px;
      background: rgba(250, 250, 247, .08); border: 1px solid rgba(250, 250, 247, .12);
      border-radius: 100px; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      transition: background .25s ease, border-color .25s ease, box-shadow .25s ease;
    }
    /* Sobre las secciones claras el cristal translúcido no contrasta: se opaca en verde. */
    .compacto .navbar, .solido .navbar {
      background: rgba(10, 25, 25, .9); border-color: rgba(250, 250, 247, .16);
      box-shadow: 0 12px 32px rgba(0, 0, 0, .3);
    }
    .marca { display: flex; align-items: center; gap: 12px; }
    .logo { height: 40px; width: auto; display: block; }
    ul { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; }
    li a { font-size: 20px; font-weight: 400; color: var(--blanco); padding: 16px 12px; display: block; white-space: nowrap; }
    li a:hover { color: var(--turquesa-claro); }
    .btn-cta { min-height: 56px; padding: 16px 24px; }
    @media (max-width: 1240px) { li a { font-size: 17px; padding: 16px 8px; } .logo { height: 34px; } }
    @media (max-width: 1040px) { ul { display: none; } }
    @media (prefers-reduced-motion: reduce) { .wrap, .navbar { transition: none; } }
  `,
})
export class NavbarComponent {
  /** true en cuanto el usuario baja del borde: el navbar se acerca al tope y se opaca. */
  readonly compacto = signal(false);

  /** Fuera del inicio (fichas con fondo claro arriba) el navbar va siempre opaco. */
  private readonly router = inject(Router);
  readonly enInicio = toSignal(
    this.router.events.pipe(filter(e => e instanceof NavigationEnd), map(() => this.router.url.split(/[?#]/)[0] === '/')),
    { initialValue: true },
  );

  @HostListener('window:scroll')
  alScrollear() {
    this.compacto.set(window.scrollY > 40);
  }
}
