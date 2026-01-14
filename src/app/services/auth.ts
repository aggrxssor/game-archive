import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private _currentUser$ = new BehaviorSubject<string | null>(null);
  private static readonly STORAGE_KEY = 'auth.currentUser';

  constructor() {
    const saved = localStorage.getItem(Auth.STORAGE_KEY);
    const username = saved?.trim();

    if (username) {
      this._currentUser$.next(username);
    }
  }


  currentUser$ = this._currentUser$.asObservable();

  get username(): string | null {
  return this._currentUser$.value;
  }

  get currentUser(): string | null {
    return this._currentUser$.value;
  }

  get isLoggedIn(): boolean {
    return this._currentUser$.value !== null;
  }

  // Mock login (backend l8r)
  login(username: string): void {
    this._currentUser$.next(username);
    localStorage.setItem(Auth.STORAGE_KEY, username);
  }

  logout(): void {
    this._currentUser$.next(null);
    localStorage.removeItem(Auth.STORAGE_KEY);
  }



  toggle(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.login('miramira0820');
    }
  }

}

