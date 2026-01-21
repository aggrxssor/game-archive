import { Injectable } from '@angular/core';

export interface LocalAuthUser {
  username: string;
  email: string;
  password: string;
  joined: string;
  isAdmin: boolean;
}


@Injectable({
  providedIn: 'root',
})
  
export class LocalUsers {
  private static readonly STORAGE_KEY = "auth.users";

  private users: LocalAuthUser[] = [];

  constructor() {
    const raw = localStorage.getItem(LocalUsers.STORAGE_KEY);
    this.users = raw ? JSON.parse(raw) : [];
  }

  private persist(): void{
    localStorage.setItem(LocalUsers.STORAGE_KEY, JSON.stringify(this.users));
  }

  getAll(): LocalAuthUser[]{
    return [...this.users];
  }

  findByEmail(email: string): LocalAuthUser | undefined {
    return this.users.find(u => u.email.toLocaleLowerCase() === email.toLocaleLowerCase());
  }

  findByUsername(username: string): LocalAuthUser | undefined {
    return this.users.find(u => u.username.toLocaleLowerCase() === username.toLocaleLowerCase());
  }

  add(user: LocalAuthUser): void {
    this.users.push(user);
    this.persist();
  }

  validateCredentials(email: string, password: string): LocalAuthUser | null {
    const user = this.users.find(
      u => u.email.toLowerCase() === email
    );

    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    return user;
  }

}
