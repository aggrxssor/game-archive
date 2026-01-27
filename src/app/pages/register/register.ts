import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  validationError: string | null = null;
  flashError = false;

  email = '';
  password = '';
  username = '';
  confirmPassword = '';

  constructor(
    private auth: Auth
  ) {}

  register(): void {
    this.validationError = null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{6,}$/;

    if (!emailRegex.test(this.email)) {
      this.triggerError('Incorrect email');
      return;
    }

    if (!usernameRegex.test(this.username)) {
      this.triggerError(
        'Usernames must be at least 6 characters long and can only use letters, numbers, - and _'
      );
      return;
    }

    if (this.password.length < 8) {
      this.triggerError('Password must be at least 8 characters long');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.triggerError('Passwords do not match');
      return;
    }

    this.auth.register(this.username, this.email, this.password);
  }

  private triggerError(message: string): void {
    this.validationError = message;
    this.flashError = true;

    setTimeout(() => {
      this.flashError = false;
    }, 500);
  }
}
