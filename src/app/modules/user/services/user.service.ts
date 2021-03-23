import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import jwt from 'jwt-decode';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../../environments/environment';
import { ICreateUser, ILogin, ILoginResponse, IUser, IUserLogged } from '../models/login';
import { IResponseAPI } from '../../shared/models/response';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private readonly _http: HttpClient,
		private readonly _storageService: LocalStorageService,
		private readonly _toastService: ToastrService,
	) { }

	authenticate(login: ILogin) {
		if (!login.nickname || !login.password) {
			return throwError(this?._toastService?.warning('Informe seu login e senha'));
		};

		return this._http
			.post<ILoginResponse>(`${environment.api}/user/login`, login)
			.pipe(
				take(1),
				map(result => {
					const { token } = result;
					const decoded = jwt<IUserLogged>(token);
					this._storageService.set('user', decoded);
					this._storageService.set('token', token);
					return result;
				}),
				catchError((error: HttpErrorResponse) => throwError(this?._toastService?.error(error?.error?.message)))
			);
	}

	async logout() {
		this._storageService.clearAll();
	}

	createAccount(userData: ICreateUser) {
		if (!userData.name || !userData.surname || !userData.nickname || !userData.password) {
			return throwError(this?._toastService?.warning('Preencha o formulário corretamente para finalizar seu cadastro'));
		};

		return this._http
			.post<IResponseAPI>(`${environment.api}/user/create-account`, userData)
			.pipe(
				take(1),
				map(result => {
					const { message } = result;
					this?._toastService?.success(message);
					return result;
				}),
				catchError((error: HttpErrorResponse) => throwError(this?._toastService?.error(error?.error?.message)))
			);
	}

	deleteAccount() {
		return this._http
			.delete<IResponseAPI>(`${environment.api}/user/delete-account`)
			.pipe(
				take(1),
				map(result => {
					const { message } = result;
					this?._toastService?.success(message);
					return result;
				}),
				catchError((error: HttpErrorResponse) => throwError(this?._toastService?.error(error?.error?.message)))
			);
	}

	getAll() {
		return this._http
			.get<IUser[]>(`${environment.api}/users`)
			.pipe(
				take(1),
				map(result => result),
				catchError((error: HttpErrorResponse) => throwError(this?._toastService?.error(error?.error?.message)))
			);
	}

}
