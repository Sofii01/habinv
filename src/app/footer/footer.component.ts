import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer>
      <div class="contenedor">
        <div class="info">
          <div class="marca">
            <img class="logo" src="/img/logo-habinv.png" alt="Habinv" width="191" height="42">
            <p>Invertí en proyectos inmobiliarios seleccionados junto a otros inversores, 
simulá tu retorno y seguí tu inversión online.</p>
          </div>
          <div class="columnas">
            <nav aria-label="Navegación">
              <h4>Navegación</h4>
              <a routerLink="/" fragment="como-funciona">Cómo funciona</a>
              <a routerLink="/" fragment="proyectos">Proyectos</a>
              <a routerLink="/" fragment="simulador">Simulador</a>
              <a routerLink="/" fragment="contacto">Contacto</a>
            </nav>
            <div class="contacto">
              <h4>Contacto</h4>
              <a href="mailto:hola@habinv.com">hola&#64;habinv.com</a>
              <a href="tel:+5491100000000">+54 9 11 0000 0000</a>
              <span>Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>
        <hr>
        <div class="legal">
          <span>© 2026 Habinv. Todos los derechos reservados.</span>
          <span>Toda inversión implica riesgos. Los retornos son estimados y no están garantizados.</span>
          <span class="links"><a href="#">Términos y condiciones</a><a href="#">Política de privacidad</a></span>
        </div>
      </div>
    </footer>
  `,
  styles: `
    footer { background: var(--verde-panel); padding: 96px var(--pad-x) 48px; }
    .info { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px; }
    .marca { max-width: 331px; display: grid; gap: 24px; }
    .logo { display: block; width: 191px; max-width: 100%; height: auto; }
    .marca p { font-size: 16px; line-height: 20px; color: #DCE4E1; }
    .columnas { display: flex; gap: 80px; }
    nav, .contacto { display: flex; flex-direction: column; gap: 12px; font-size: 16px; }
    h4 { margin: 0; font: italic 400 20px/20px var(--font); color: var(--turquesa); }
    a:hover { color: var(--turquesa-claro); }
    hr { border: 0; border-top: 1.5px solid var(--turquesa); margin: 40px 0 28px; }
    .legal { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px 32px; font-size: 12px; color: var(--gris); }
    .links { display: flex; gap: 24px; color: #DCE4E1; }
  `,
})
export class FooterComponent {}

