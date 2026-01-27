import { Component } from '@angular/core';
import { App } from '../../app';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private audioEnabled = false;
  private hoverSound = new Audio('/assets/sounds/hoverAudio.wav');

  enableAudio(): void {
    this.audioEnabled = true;
  }

  playHoverSound(): void {
    if (!this.audioEnabled) return;

    const sound = this.hoverSound.cloneNode() as HTMLAudioElement;
    sound.volume = 0.1;
    sound.play();
  }
}

