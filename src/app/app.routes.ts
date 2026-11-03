import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FichaComponent } from './proyectos/ficha/ficha.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'proyecto/:slug', component: FichaComponent },
  { path: '**', redirectTo: '' },
];
