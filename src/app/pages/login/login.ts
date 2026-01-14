import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalUsers } from '../../services/local-users';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authError: string | null = null;

  validationError: string | null = null;
  flashError = false;

  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute,
    private localUsers: LocalUsers

  ) {}

  login(): void {
    this.validationError = null;
    this.authError = null;

    if (!this.email.trim() && !this.password.trim()) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.triggerError('Incorrect email');
      return;
    }

    if (this.password.length < 8) {
      this.triggerError('Incorrect email or password');
      return;
    }

    const user = this.localUsers.validateCredentials(
      this.email.trim().toLowerCase(),
      this.password
    );

    if (!user) {
      this.authError = 'Incorrect email or password';
      this.flashError = true;
      setTimeout(() => (this.flashError = false), 1000);
      return;
    }

    this.auth.login(user.username);

    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/home';

    this.router.navigateByUrl(returnUrl);
  }

  private triggerError(message: string): void {
    this.validationError = message;
    this.flashError = true;

    setTimeout(() => {
      this.flashError = false;
    }, 500);
  }

}
