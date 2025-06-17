import { CanActivateFn, Router, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { AutorListComponent } from './components/autor/autor-list/autor-list.component';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { LivroListComponent } from './components/livro/livro-list/livro-list.component';
import { LivroFormComponent } from './components/livro/livro-form/livro-form.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'usuarios', component: UsuarioListComponent, canActivate: [authGuard] },
    { path: 'usuarios/novo', component: UsuarioFormComponent, canActivate: [authGuard] },
    { path: 'usuarios/editar/:id', component: UsuarioFormComponent, canActivate: [authGuard] },
    { path: 'autores', component: AutorListComponent, canActivate: [authGuard] },
    { path: 'autores/novo', component: AutorFormComponent, canActivate: [authGuard] },
    { path: 'autores/editar/:id', component: AutorFormComponent, canActivate: [authGuard] },
    { path: 'livros', component: LivroListComponent , canActivate: [authGuard] },
    { path: 'livros/novo', component: LivroFormComponent, canActivate: [authGuard] },
    { path: 'livros/editar/:id', component: LivroFormComponent, canActivate: [authGuard] },

];
