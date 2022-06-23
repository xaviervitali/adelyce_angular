import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { Subject, interval } from 'rxjs';
import { User } from '../user';
import { TokenResponse } from './tokenResponse';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<boolean>();
  user!: User;

  constructor(private http: HttpClient) {
    interval(5000).subscribe(() =>
      this.authChanged.next(this.isAuthenticated())
    );
  }

  isAuthenticated() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const data: any = jwtDecode(token);
    this.user = data;
    return Date.now() < data.exp * 1000;
  }

  logout() {
    window.localStorage.removeItem('token');
    this.authChanged.next(false);
  }
  authenticate(credentials: Credential) {
    return this.http.post(environment.apiUrl + '/login', credentials).pipe(
      tap((data: TokenResponse) => {
        this.authChanged.next(true);

        window.localStorage.setItem('token', data.token ?? '');
      })
    );
  }

  getToken() {
    return window.localStorage.getItem('token');
  }
}
