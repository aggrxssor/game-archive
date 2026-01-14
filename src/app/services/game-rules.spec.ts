import { TestBed } from '@angular/core/testing';

import { GameRules } from './game-rules';

describe('GameRules', () => {
  let service: GameRules;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRules);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
