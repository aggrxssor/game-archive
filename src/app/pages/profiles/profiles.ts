import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/auth';
import { LocalUsers } from '../../services/local-users';
import { ProfilePreferences } from '../../services/profile-preferences';
import { UserStatsService } from '../../services/user-stats';

interface UserProfile {
  username: string;
  joined: string;
  avatar: string;
  background: string;
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
    private localUsers: LocalUsers,
    private prefs: ProfilePreferences, //temp
    private stats: UserStatsService // temp
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

      // 🔑 identity check
      const authUser = this.localUsers.findByUsername(username);
      if (!authUser) {
        this.user = undefined;
        this.resetStats();
        return;
      }

      // Ensure profile prefs exist
      this.prefs.ensureProfile(authUser.username);

      const saved = this.prefs.get(authUser.username)!;
      const defaults = this.prefs.defaults();
      this.isPrivateProfile = saved.isPrivate ?? false;

      // Build profile
      this.user = {
        username: authUser.username,
        joined: authUser.joined,
        avatar: saved.avatar ?? defaults.avatar,
        background: saved.background ?? defaults.background
      };

      this.currentAvatar = this.user.avatar;
      this.currentBackground = this.user.background;
      this.selectedAvatar = this.currentAvatar;
      this.selectedBackground = this.currentBackground;

      this.computeOwnership();
      this.recomputeStats();
    });

    // React to auth changes
    this.auth.currentUser$.subscribe(() => {
      this.computeOwnership();
    });
  }

  // -------------------------
  // Ownership & stats
  // -------------------------

  private computeOwnership(): void {
    this.isOwnProfile = false;

    if (this.user && this.auth.isLoggedIn && this.auth.username) {
      this.isOwnProfile =
        this.auth.username.toLowerCase() === this.user.username.toLowerCase();
    }
  }

  private resetStats(): void {
    this.totalGames = 0;
    this.bestScore = undefined;
    this.recentScores = [];
  }

  private recomputeStats(): void {
    if (!this.user) {
      this.totalGames = 0;
      this.bestScore = undefined;
      this.recentScores = [];
      return;
    }

    const userStats = this.stats.get(this.user.username);

    this.totalGames = userStats.gamesPlayed;

    if (userStats.scores.length > 0) {
      this.bestScore = Math.max(...userStats.scores.map(s => s.score));
      this.recentScores = userStats.scores
        .slice(-10)
        .reverse()
        .map(s => ({
          gameId: s.gameId,
          score: s.score,
        }));
    } else {
      this.bestScore = undefined;
      this.recentScores = [];
    }
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

    // commit draft → current
    this.currentAvatar = this.selectedAvatar;
    this.currentBackground = this.selectedBackground;

    // persist
    this.prefs.save(this.user.username, {
    avatar: this.currentAvatar,
    background: this.currentBackground,
    isPrivate: this.isPrivateProfile,
  });

    // close UI
    this.showBgPicker = false;
    this.closeAvatarPicker();
    this.closeBackgroundPicker();
  }

  discardDraft(): void {
    this.selectedAvatar = this.currentAvatar;
    this.selectedBackground = this.currentBackground;
  }
}
