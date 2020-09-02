import { TestBed } from '@angular/core/testing';

import { AuthWaiterGuard } from './auth-waiter.guard';

describe('AuthWaiterGuard', () => {
  let guard: AuthWaiterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthWaiterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
