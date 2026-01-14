import { Injectable } from '@angular/core';

export interface ProfilePrefs {
  avatar: string;
  background: string;
  isPrivate: boolean;
}

const DEFAULT_PREFS: ProfilePrefs = {
  avatar: 'avatar3.png',
  background: 'default.jpg',
  isPrivate: false,
};

@Injectable({
  providedIn: 'root',
})
export class ProfilePreferences {
  private key(username: string): string{
    return `profile_prefs_${username.toLocaleLowerCase()}`;
  }

  get(username: string): ProfilePrefs | null {
    const raw = localStorage.getItem(this.key(username));
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  save(username: string, prefs: ProfilePrefs): void {
    localStorage.setItem(this.key(username), JSON.stringify(prefs));
  }

  clear(username: string): void {
    localStorage.removeItem(this.key(username));
  }
  
  defaults(): ProfilePrefs {
    return { ...DEFAULT_PREFS };
  }

  ensureProfile(username: string): void {
    if (!this.get(username)) {
      this.save(username, this.defaults());
    }
  }

}
