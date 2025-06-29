import { provideRouter, Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { authInterceptor } from './auth/auth.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // example of a protected route:
  {
  path: 'tasks',
loadComponent: () => import('../app/task/task-list/task-list.component').then(m => m.TaskListComponent),
  canActivate: [authGuard]
}
  
];

export const appConfig = [
   provideHttpClient(withInterceptors([authInterceptor])),
  provideRouter(routes)
];
