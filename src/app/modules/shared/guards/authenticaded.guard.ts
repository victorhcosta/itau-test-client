import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
	providedIn: 'root'
})
export class AuthenticadedGuard implements CanActivate {
	constructor(private readonly _storage: LocalStorageService, private readonly _router: Router) { }

	canActivate(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const hasToken = !!this._storage.get('token');

		// eslint-disable-next-line no-console
		console.info('tem token', hasToken);

		if (!hasToken) {
			this._router.navigate(['/']);
		};

		return hasToken;
	}

}
