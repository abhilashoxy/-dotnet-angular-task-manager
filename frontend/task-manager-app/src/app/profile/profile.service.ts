import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
environment
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.api}/user/me`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.api}/user/me`, data);
  }
}
