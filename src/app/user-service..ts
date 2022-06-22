import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  create(user: User) {
    return this.http.post<User>(environment.apiUrl + '/users', user);
  }

  update(user: User) {
    return this.http.put<User>(environment.apiUrl + '/users/' + user.id, user);
  }
}
