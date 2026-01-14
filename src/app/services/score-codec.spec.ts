import { TestBed } from '@angular/core/testing';

import { ScoreCodec } from './score-codec';

describe('ScoreCodec', () => {
  let service: ScoreCodec;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreCodec);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
