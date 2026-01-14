import { TestBed } from '@angular/core/testing';

import { ProfilePreferences } from './profile-preferences';

describe('ProfilePreferences', () => {
  let service: ProfilePreferences;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilePreferences);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
