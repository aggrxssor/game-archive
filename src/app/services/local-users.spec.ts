import { TestBed } from '@angular/core/testing';

import { LocalUsers } from './local-users';

describe('LocalUsers', () => {
  let service: LocalUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
