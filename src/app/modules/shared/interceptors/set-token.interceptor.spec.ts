import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SetTokenInterceptor } from './set-token.interceptor';

describe('SetTokenInterceptor', () => {
	let interceptor: SetTokenInterceptor;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
			],
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: SetTokenInterceptor,
					multi: true,
				}
			]
		});

		interceptor = TestBed.inject(SetTokenInterceptor);
		httpMock = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		const int = TestBed.inject(SetTokenInterceptor);
		console.info('int', int);
		expect(int).toBeTruthy();
	});
});
