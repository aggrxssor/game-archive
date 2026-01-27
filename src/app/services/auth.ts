import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthUser {
  username: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private static readonly API = 'http://127.0.0.1:8000/api';

  private usernameSubject = new BehaviorSubject<string | null>(null);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  username$ = this.usernameSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  get username(): string | null {
    return this.usernameSubject.value;
  }

  get isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.usernameSubject.value;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem('auth.token');
    if (token) {
      this.fetchMe();
    }
  }

  register(username: string, email: string, password: string): void {
    this.http.post<any>(`${Auth.API}/register`, { name: username, email, password })
      .subscribe(res => {
        this.handleAuth(res);
        this.router.navigate(['/profiles', res.user.username]);
      });
  }

  /*
    // Mock login (backend l-8-r)
    login(username: string): void {
    this._currentUser$.next(username);
    localStorage.setItem(Auth.STORAGE_KEY, username);
    }
  */

  login(email: string, password: string) {
    return this.http.post<any>(`${Auth.API}/login`, { email, password });
  }

  logout(): void {
      this.http.post(`${Auth.API}/logout`, {}).subscribe(() => {
      localStorage.removeItem('auth.token');
      this.usernameSubject.next(null);
      this.isAdminSubject.next(false);
      this.router.navigate(['/login']);
    });
  }
    
  private fetchMe(): void {
    this.http.get<any>(`${Auth.API}/me`).subscribe(res => {
      this.usernameSubject.next(res.username);
      this.isAdminSubject.next(!!res.isAdmin);
    });
  }

  handleAuth(res: any): void {
    localStorage.setItem('auth.token', res.token);
    this.usernameSubject.next(res.user.username);
    this.isAdminSubject.next(!!res.user.isAdmin);
  }

  getProfile(username: string) {
    return this.http.get<any>(
      `http://127.0.0.1:8000/api/profiles/${username}`
    );
  }
}


    // gomb debuggolashoz
    /*   toggle(): void {  
        if (this.isLoggedIn) {
          this.logout();
        } else {
          this.login('miramira0820');
        }
      } */


