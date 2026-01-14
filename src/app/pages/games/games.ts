import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../models/game-model';
import { Auth } from '../../services/auth';
import { GameData } from '../../services/game-data';

@Component({
  selector: 'app-games',
  standalone: false,
  templateUrl: './games.html',
  styleUrl: './games.css',
})
  
  
export class Games implements OnInit {

  game?: Game;

  constructor(
  private route: ActivatedRoute,
  private router: Router,
  public auth: Auth,
  private gameData: GameData //temp
) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.game = undefined;
        return;
      }

      this.gameData.getById(id).subscribe(game => {
        this.game = game;
      });
    });
  }

  onDownloadClick(event: Event): void {
    if (!this.auth.isLoggedIn) {
      event.preventDefault();
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
    }
  }
}
