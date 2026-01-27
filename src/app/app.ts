import { Component, HostListener } from '@angular/core';
import { Auth } from './services/auth';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  showBackToTop = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showBackToTop = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  constructor(public auth: Auth, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.body.classList.remove(
          'bg-login',
          'bg-register',
          'bg-games',
          'bg-scoreboard',
          'bg-home',
          'bg-profiles',
          'bg-welcome',
          'bg-faq',
          'bg-rules'
        );

        if (event.url.startsWith('/login')) {
        document.body.classList.add('bg-login');
        }
        else if (event.url.startsWith('/register')) {
          document.body.classList.add('bg-register');
        }
        else if (event.url.startsWith('/games')) {
          document.body.classList.add('bg-games');
        }
        else if (event.url.startsWith('/scoreboard')) {
          document.body.classList.add('bg-scoreboard');
        }
        else if (event.url.startsWith('/home')) {
          document.body.classList.add('bg-home');
        }
        else if (event.url.startsWith('/profiles')) {
          document.body.classList.add('bg-profiles');
        }
        else if (event.url.startsWith('/info')) {
          document.body.classList.add('bg-faq');
        }
        else if (event.url.startsWith('/rules')) {
          document.body.classList.add('bg-rules');
        }
        else if (event.url.startsWith('/request')) {
          document.body.classList.add('bg-profiles');
        }
        else {
          document.body.classList.add('bg-welcome');
        }
      }
    });
  }
}
