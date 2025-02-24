import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

import {
  IAuthData,
  ICreateUser,
  ICurrentUserAndRole,
} from '../common/models/auth.interface';
import { environment } from '../../environments/environment.development';
import { HttpService } from './http.service';
import { Role } from '../common/enums/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: string = 'userData';
  private _currentUserAndRole = new BehaviorSubject<ICurrentUserAndRole | null>(
    this.getUserAndRole(),
  );
  currentUserAndRole$ = this._currentUserAndRole.asObservable();

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) {}

  signup(body: ICreateUser): Observable<ICreateUser> {
    const url = '/auth/signup';

    return this.httpService.post(environment.API_URL + url, body).pipe(
      catchError((error) => {
        console.error('Error during signup:', error);
        return throwError(() => error);
      }),
    );
  }

  login(username: string, password: string): Observable<IAuthData> {
    const url = '/auth/login';
    return this.httpService
      .post(environment.API_URL_MOCK + url, {
        username,
        password,
      })
      .pipe(
        tap((response: IAuthData) => {
          if (response.accessToken) {
            response.role = Role.USER;
            this.setUserData({
              id: response.id,
              username: response.username,
              accessToken: response.accessToken,
              email: response.email,
              role: response.role,
            });
            this._currentUserAndRole.next({
              username: response.username,
              role: response.role,
            });
          }
        }),
        catchError((error) => {
          console.error('Error in login:', error);
          return throwError(() => error);
        }),
      );
  }

  setUserData(data: IAuthData): void {
    try {
      localStorage.setItem(this.userData, JSON.stringify(data));
    } catch (error) {
      console.error('Error save data in local storage: ', error);
    }
  }

  getUser(): IAuthData | null {
    const data = localStorage.getItem(this.userData);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  getUserAndRole(): ICurrentUserAndRole | null {
    const user = this.getUser();
    if (user) {
      return {
        username: user.username,
        role: user.role,
      };
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getUser()?.accessToken;
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.userData);
    this.router.navigate(['/login']);
  }
}
