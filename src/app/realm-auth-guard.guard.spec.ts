import { TestBed } from '@angular/core/testing';

import { RealmAuthGuardGuard } from './realm-auth-guard.guard';

describe('RealmAuthGuardGuard', () => {
  let guard: RealmAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RealmAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
