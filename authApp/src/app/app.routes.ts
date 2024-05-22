import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    //canActivate: [IsNotAuthenticatedGuard],
    loadComponent: () => import('./auth/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
      },
      {
        path: '**',
        redirectTo: 'login'
      }

    ]
    //canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadComponent:() => import('./layouts/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
  }





];
