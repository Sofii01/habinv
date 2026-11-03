import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ComoFuncionaComponent } from '../como-funciona/como-funciona.component';
import { ProyectosComponent } from '../proyectos/proyectos.component';
import { DestacadoComponent } from '../destacado/destacado.component';
import { SimuladorComponent } from '../simulador/simulador.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ComoFuncionaComponent, ProyectosComponent,
            DestacadoComponent, SimuladorComponent, ContactoComponent, FooterComponent],
  template: `
    <main>
      <app-hero />
      <app-como-funciona />
      <app-proyectos />
      <app-destacado />
      <app-simulador />
      <app-contacto />
    </main>
    <app-footer />
  `,
})
export class HomeComponent {}
