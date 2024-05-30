import { Injectable, signal } from '@angular/core';
import { User } from '../models/auth-models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginModel } from '../models/auth-models/loginModel';
import { tap } from 'rxjs';
import { RegisterModel } from '../models/auth-models/registerModel';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = environment.apiUrl;
  user = signal<User | null>(null);
  previousPage = '';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(model: LoginModel) {
    return this.http.post<User>(`${this.baseUrl}/login`, model).pipe(
      tap((response) => {
        this.user.set(response);
        localStorage.setItem('user', JSON.stringify(response));
      }),
    );
  }

  register(model: RegisterModel) {
    return this.http.post<User>(`${this.baseUrl}/register`, model).pipe(
      tap((response) => {
        this.user.set(response);
        localStorage.setItem('user', JSON.stringify(response));
      }),
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.user.set(null);
    this.router.navigateByUrl('');
  }

  setUserIfLoggedIn() {
    let userStr = localStorage.getItem('user');
    if (userStr) {
      const user: User = JSON.parse(userStr);
      this.user.set(user);
    }
  }
}
