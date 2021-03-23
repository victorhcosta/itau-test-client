/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class SetTokenInterceptor implements HttpInterceptor {

	constructor(
		private readonly _storageService: LocalStorageService
	) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this._storageService.get('token');
		const authorization = `Bearer ${token}`;

		if(token) {
			request = request.clone({
				setHeaders: {
					Authorization: authorization,
				}
			});
		}

		return next.handle(request);
	}
}
