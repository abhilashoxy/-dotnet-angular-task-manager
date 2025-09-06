import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    loadComponent: () => import('./task/task-list/task-list.component').then(m => m.TaskListComponent),
    canActivate: [authGuard]
  },
  {
      path: 'my-profile',
      component: MyProfileComponent,
      canActivate: [authGuard]
    },
];

export const appConfig = [
  provideHttpClient(withInterceptorsFromDi()), // ✅ tells Angular to get interceptors from DI
  provideRouter(routes)
];
