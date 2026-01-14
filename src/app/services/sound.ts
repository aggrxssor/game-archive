import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  enabled: boolean | null = null;

  // keep one base sound to clone
  private hoverSound = new Audio("./assets/sounds/hoverAudio.wav");

  constructor() {
    this.hoverSound.volume = 0.1;
  }

  async enable(): Promise<void> {
    this.enabled = true;

    // Unlock audio on a real user gesture (the button click)
    try {
      this.hoverSound.muted = true;
      await this.hoverSound.play();
      this.hoverSound.pause();
      this.hoverSound.currentTime = 0;
      this.hoverSound.muted = false;
    } catch {
      // if it fails, we still keep enabled=true; hover will keep trying
    }
  }

  disable(): void {
    this.enabled = false;
  }

  playHover(): void {
    if (!this.enabled) return;

    const sound = this.hoverSound.cloneNode() as HTMLAudioElement;
    sound.volume = 0.1;
    sound.play().catch(() => {});
  }
}
