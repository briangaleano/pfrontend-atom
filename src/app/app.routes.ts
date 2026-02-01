import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/views/login/login.component')
        .then(m => m.LoginComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./task/views/task/task.component')
        .then(m => m.TaskComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];