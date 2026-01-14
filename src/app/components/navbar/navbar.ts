import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ProfilePreferences } from '../../services/profile-preferences';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
  
export class Navbar {

  constructor(
    public auth: Auth,
    private router: Router,
    private prefs: ProfilePreferences
  ) {}

  onProfileClick(event: MouseEvent): void {
  event.preventDefault();

  if (!this.auth.isLoggedIn) {
    this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
    return;
  }

  const username = this.auth.username;
    if (username) {
      this.router.navigate(['/profiles', username]);
    }
  }

  goToProfile(): void {
    const username = this.auth.username;
    if (username) {
      this.router.navigate(['/profiles', username]);
    }
  }

  goToUploadScore(): void {
    this.router.navigate(['/scoreboard']);
  }

  get avatar(): string {
    const username = this.auth.username;
    if (!username) return 'avatar1.png';

    const prefs = this.prefs.get(username);
    return prefs?.avatar ?? 'avatar1.png';
  }

  logout(): void{
    this.auth.logout();
  }
}