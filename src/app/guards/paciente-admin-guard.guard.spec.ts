import { TestBed } from '@angular/core/testing';

import { PacienteAdminGuardGuard } from './paciente-admin-guard.guard';

describe('PacienteAdminGuardGuard', () => {
  let guard: PacienteAdminGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacienteAdminGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
