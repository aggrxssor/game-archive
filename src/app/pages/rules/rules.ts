import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameRules } from '../../data/mock-rules';
import { RulesData } from '../../services/game-rules';

@Component({
  selector: 'app-rules',
  standalone: false,
  templateUrl: './rules.html',
  styleUrl: './rules.css',
})
export class Rules implements OnInit {

  rules?: GameRules;

  constructor(
  private route: ActivatedRoute,
  private rulesData: RulesData //temp
) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        this.rules = undefined;
        return;
      }

      this.rulesData.getByGameId(id).subscribe(rules => {
        this.rules = rules;
      });
    });
  }
}
