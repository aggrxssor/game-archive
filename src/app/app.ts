import { Component, HostListener, signal } from '@angular/core';
import { Auth } from './services/auth';

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

  constructor(public auth: Auth) {}
}


  /* soundEnabled: boolean | null = null;

  enableSound(): void {
    this.soundEnabled = true;
  }

  disableSound(): void {
    this.soundEnabled = false;
  } */
  



