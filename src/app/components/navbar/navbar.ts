import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ProfilePreferences, ProfilePrefs } from '../../services/profile-preferences';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  avatarValue = 'avatar1.png';
  searchQuery = '';

  mobileOpen = false;
  mobileGamesOpen = false;
  mobileRulesOpen = false;

  constructor(
    public auth: Auth,
    private router: Router,
    private prefs: ProfilePreferences
  ) {}

  ngOnInit(): void {
    this.auth.username$.subscribe(username => {
      if (!username) {
        this.avatarValue = 'avatar1.png';
        return;
      }

      this.prefs.get(username).subscribe({
        next: (prefs: ProfilePrefs) => {
          this.avatarValue = prefs.avatar ?? 'avatar1.png';
        },
        error: () => {
          this.avatarValue = 'avatar1.png';
        }
      });
    });
  }
  get avatar(): string {
    return this.avatarValue;
  }
  
  toggleMobileMenu(): void {
    this.mobileOpen = !this.mobileOpen;

    if (!this.mobileOpen) {
      this.mobileGamesOpen = false;
      this.mobileRulesOpen = false;
    }
  }

  closeMobileMenu(): void {
    this.mobileOpen = false;
    this.mobileGamesOpen = false;
    this.mobileRulesOpen = false;
  }

  toggleMobileGames(): void {
    this.mobileGamesOpen = !this.mobileGamesOpen;
    if (this.mobileGamesOpen) this.mobileRulesOpen = false;
  }

  toggleMobileRules(): void {
    this.mobileRulesOpen = !this.mobileRulesOpen;
    if (this.mobileRulesOpen) this.mobileGamesOpen = false;
  }

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
      this.closeMobileMenu();
    }
  }

  goToProfile(): void {
    const username = this.auth.username;
    if (username) {
      this.router.navigate(['/profiles', username]);
      this.closeMobileMenu();
    }
  }

  goToUploadScore(): void {
    this.router.navigate(['/scoreboard']);
    this.closeMobileMenu();
  }


  logout(): void {
    this.auth.logout();
    this.closeMobileMenu();
  }

onSearch(e?: Event): void {
  if (e) e.preventDefault();

  const q = this.searchQuery.trim().toLowerCase();

  if (!q) return;

  if (q === 'tron') {
    this.router.navigate(['/games', 'tron']);
  }
  else if (q === 'chess') {
    this.router.navigate(['/games', 'chess']);
  }
  else if (q === 'spaceshooter' || q === 'space shooter') {
    this.router.navigate(['/games', 'spaceshooter']);
  }
  else if (q === 'request') {
    this.router.navigate(['/request']);
  }
  else if (q === 'scoreboard' || q === 'leaderboard') {
    this.router.navigate(['/scoreboard']);
  }
  else {
    this.router.navigate(['/404']);
  }

  this.searchQuery = '';
}

}
