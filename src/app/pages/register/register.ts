import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalAuthUser, LocalUsers } from '../../services/local-users';
import { ProfilePreferences } from '../../services/profile-preferences';

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
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute,
    private localUsers: LocalUsers,
    private profiles: ProfilePreferences
  ) { }

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

    if (this.localUsers.findByEmail(this.email)) {
      this.triggerError('Email already in use');
      return;
    }

    if (this.localUsers.findByUsername(this.username)) {
      this.triggerError('Username already in use');
      return;
    }


    const user: LocalAuthUser = {
      username: this.username.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password,
      joined: new Date().toISOString(),
      isAdmin: false, // komment /////////////////////////////////////////
    };

    this.localUsers.add(user);

    this.auth.login(user.username);

    this.profiles.ensureProfile(user.username);

    this.auth.login(user.username);

    this.router.navigate(['/profiles', user.username]);

  }

    private triggerError(message: string): void {
    this.validationError = message;
    this.flashError = true;

    setTimeout(() => {
      this.flashError = false;
    }, 500);
  }
}
