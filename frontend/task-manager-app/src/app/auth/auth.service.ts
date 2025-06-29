import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.api}/auth/login`, data).pipe(
      tap((res: any) => {
        if (res?.token) localStorage.setItem('token', res.token);
      })
    );
  }

  register(data: any) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
