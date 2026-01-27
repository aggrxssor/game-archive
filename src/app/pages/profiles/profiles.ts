import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/auth';
import { UserStatsService } from '../../services/user-stats';
import { ProfilePreferences } from '../../services/profile-preferences';

interface UserProfile {
  username: string;
  joined: string;
  avatar: string;
  background: string;
  bio: string;
}

@Component({
  selector: 'app-profiles',
  standalone: false,
  templateUrl: './profiles.html',
  styleUrl: './profiles.css',
})
export class Profiles implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public auth: Auth,
    private prefs: ProfilePreferences, //temp (vagy lehet megsem)
    private stats: UserStatsService,
  ) {}

  showAvatarPicker = false;
  lockAvatarPicker = false;
  showBackgroundPicker = false;
  lockBackgroundPicker = false;
  showBgPicker = false;
  isPrivateProfile = false;

  avatars = [
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png',
    'avatar5.png',
    'avatar6.png',
    'avatar7.png',
    'avatar8.png',
    'avatar9.png',
  ];

  backgrounds = [
    'default.jpg',
    '16bit_japan.jpg',
    '16bit_japan_2.jpg',
    '16bit_japan_3.jpg',
  ];

  username!: string;
  user?: UserProfile;
  isOwnProfile = false;

  currentAvatar = 'avatar1.png';
  currentBackground = 'default.jpg';
  bio: string = '';

  selectedAvatar = this.currentAvatar;
  selectedBackground = this.currentBackground;

  totalGames = 0;
  bestScore?: number;
  recentScores: {
    gameId: string;
    score: number
  }[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (!username) return;

      this.username = username;

      this.auth.getProfile(username).subscribe({
        next: apiUser => {
          this.prefs.get(apiUser.username).subscribe({
            next: prefs => {
              const defaults = this.prefs.defaults();

              this.isPrivateProfile = prefs.isPrivate ?? false;

              this.user = {
                username: apiUser.username,
                joined: apiUser.joined,
                avatar: prefs.avatar ?? defaults.avatar,
                background: prefs.background ?? defaults.background,
                bio: prefs.bio ?? ''
              };

              this.currentAvatar = this.user.avatar;
              this.currentBackground = this.user.background;
              this.selectedAvatar = this.currentAvatar;
              this.selectedBackground = this.currentBackground;
              this.bio = prefs.bio ?? '';

              this.computeOwnership();
              this.recomputeStats();
            },
            error: () => {
              const defaults = this.prefs.defaults();

              this.user = {
                username: apiUser.username,
                joined: apiUser.joined,
                avatar: defaults.avatar,
                background: defaults.background,
                bio: ''
              };

              this.currentAvatar = defaults.avatar;
              this.currentBackground = defaults.background;
              this.selectedAvatar = defaults.avatar;
              this.selectedBackground = defaults.background;
              this.bio = '';
              
              this.computeOwnership();
              this.recomputeStats();
            }
          });
        },
        error: () => {
          this.user = undefined;
        }
      });
    });

    this.auth.username$.subscribe(() => {
      this.computeOwnership();
    });
  }


  private computeOwnership(): void {
    this.isOwnProfile = false;

    if (this.user && this.auth.isLoggedIn && this.auth.username) {
      this.isOwnProfile =
        this.auth.username.toLowerCase() === this.user.username.toLowerCase();
    }
  }

  private recomputeStats(): void {
    if (!this.user) return;

    this.stats.getStats(this.user.username).subscribe({
      next: (data: {
        gamesPlayed: number;
        bestScore: number | null;
        recentScores: { gameId: string; score: number }[];
      }) => {
        this.totalGames = data.gamesPlayed;
        this.bestScore = data.bestScore ?? undefined;
        this.recentScores = data.recentScores;
      },
      error: () => {
        this.totalGames = 0;
        this.bestScore = undefined;
        this.recentScores = [];
      }
    });
  }

  toggleAvatarPicker(): void {
    if (this.lockAvatarPicker) {
      this.closeAvatarPicker();
    } else {
      this.showAvatarPicker = true;
      this.lockAvatarPicker = true;
      this.showBackgroundPicker = false;
      this.lockBackgroundPicker = false;
    }
  }
  closeAvatarPicker(): void{
    this.showAvatarPicker = false;
    this.lockAvatarPicker = false;
    this.showBackgroundPicker = false;
    this.lockBackgroundPicker = false;
  }
  toggleBackgroundPicker(): void {
    if (this.lockBackgroundPicker) {
      this.closeBackgroundPicker();
    } else {
      this.showBackgroundPicker = true;
      this.lockBackgroundPicker = true;
      this.showAvatarPicker = false;
      this.lockAvatarPicker = false;
    }
  }
  closeBackgroundPicker(): void{
    this.showBackgroundPicker = false;
    this.lockBackgroundPicker = false;
    this.showAvatarPicker = false;
    this.lockAvatarPicker = false;
  }
  saveProfileCustomization(): void {
    if (!this.user || !this.isOwnProfile) return;

    this.currentAvatar = this.selectedAvatar;
    this.currentBackground = this.selectedBackground;

    this.prefs.save({
      avatar: this.currentAvatar,
      background: this.currentBackground,
      bio: this.bio,
      isPrivate: this.isPrivateProfile,
    }).subscribe();


    this.showBgPicker = false;
    this.closeAvatarPicker();
    this.closeBackgroundPicker();
  }

  discardDraft(): void {
    this.selectedAvatar = this.currentAvatar;
    this.selectedBackground = this.currentBackground;
  }
}
