import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiUrl;
  currentUser: any = null;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.api}/Auth/login`, data).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          const decoded = this.decodeToken(res.token);
          this.currentUser = {
            email: decoded.sub,
            username: decoded.username || decoded.email || '',
            address: decoded.address || ''
          };
        }
      })
    );
  }

  register(data: any) {
    return this.http.post(`${this.api}/Auth/register`, data);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

 getUserInfo() {
  if (!this.token) return null;
  const payload = JSON.parse(atob(this.token.split('.')[1]));
  return {
    email: payload.sub,
    username: payload.username,
    address: payload.address
  };
}


  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Invalid token');
      return {};
    }
  }
}
