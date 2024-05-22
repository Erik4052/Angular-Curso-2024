import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, of, tap, Observable, catchError, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus | null>(AuthStatus.checking);
  /* this variable is a computed property that returns the value of
  the _currentUser signal, so that we can use it in our components instead of the signal itself. */

  currentUser = computed(() => this._currentUser());


  /* this variable is a computed property that returns the value of
  the _authStatus signal, so that we can use it in our components instead of the signal itself. */

  authStatus = computed(() => this._authStatus());


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(({ user, token }) => this._setAuthentication(user, token)),
        map(() => true),

        catchError(err => {
          return throwError(() => err.error.message);
        })
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;

    const token = localStorage.getItem('token');

    if (!token){
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ token, user }) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);

          return true;
        }),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false)
        })
      )
  }

  private _setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

}
