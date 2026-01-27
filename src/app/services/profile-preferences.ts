import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProfilePrefs {
  avatar: string;
  background: string;
  isPrivate: boolean;
  bio: string | null;
}

const DEFAULT_PREFS: ProfilePrefs = {
  avatar: 'avatar3.png',
  background: 'default.jpg',
  isPrivate: false,
  bio: null,
};

@Injectable({
  providedIn: 'root',
})
export class ProfilePreferences {

  private readonly apiUrl = 'http://127.0.0.1:8000/api/profile';

  constructor(private http: HttpClient) {}

  get(username: string): Observable<ProfilePrefs> {
    return this.http.get<any>(`${this.apiUrl}/${username}`).pipe(
      map(data => ({
        avatar: data.avatar,
        background: data.background,
        bio: data.bio,
        isPrivate: data.is_private
      }))
    );
  }

  save(prefs: ProfilePrefs): Observable<any> {
    return this.http.put(this.apiUrl, {
      avatar: prefs.avatar,
      background: prefs.background,
      bio: prefs.bio,
      is_private: prefs.isPrivate
    });
  }

  defaults(): ProfilePrefs {
    return { ...DEFAULT_PREFS };
  }
}
