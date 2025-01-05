import { Routes } from '@angular/router';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/menu-list', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'menu-list', component: MenuListComponent },
    { path: 'menu-form', component: MenuFormComponent }, // Creación
    { path: 'menu-form/:id', component: MenuFormComponent }, // Edición
];
