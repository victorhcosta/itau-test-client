import { TestBed } from '@angular/core/testing';

import { AuthenticadedGuard } from './authenticaded.guard';

describe('AuthenticadedGuard', () => {
	let guard: AuthenticadedGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(AuthenticadedGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
