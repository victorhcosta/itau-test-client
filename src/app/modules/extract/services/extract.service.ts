import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../../environments/environment';
import { IExtractRegister, IExtractRegisterFromAPI, IOperation, ITransaction } from '../models/extract';
import { IUserLogged } from '../../user/models/login';

@Injectable({
	providedIn: 'root'
})
export class ExtractService {
	constructor(
		private readonly _http: HttpClient,
		private readonly _toastService: ToastrService,
		private readonly _storageService: LocalStorageService,
	) { }

	getExtract(): Observable<IExtractRegister[]> {
		return this._http.get<IExtractRegisterFromAPI[]>(`${environment.api}/extract`)
			.pipe(
				take(1),
				map((response) => response.map(extra => ({
					...extra,
					operation: extra.operationType === 'deposit' ? 'Depósito' : 'Saque',
				}))),
				catchError((error: HttpErrorResponse) => throwError(this?._toastService?.error(error?.error?.message)))
			);
	}

	makeDeposit(operationData: IOperation) {
		if (!operationData.value) {
			return throwError(this?._toastService?.warning('Informe o valor do depósito'));
		};

		return this._http.post(`${environment.api}/extract/deposit`, operationData)
			.pipe(
				take(1),
				map(() => {
					this?._toastService?.success('Depósito realizado com sucesso');
					const user = this._storageService.get<IUserLogged>('user');
					const updatedUser = {
						...user,
						balance: user.balance + operationData.value
					};
					this._storageService.set('user', updatedUser);

					return updatedUser;
				}),
				catchError((error: HttpErrorResponse) => throwError(this?._toastService?.error(error?.error?.message)))
			);
	}

	makeWithdraw(operationData: IOperation) {
		if (!operationData.value) {
			return throwError(this?._toastService?.warning('Informe o valor do saque'));
		};

		return this._http.post(`${environment.api}/extract/withdraw`, operationData)
			.pipe(
				take(1),
				map(() => {
					this?._toastService?.success('Saque realizado com sucesso');
					const user = this._storageService.get<IUserLogged>('user');
					const updatedUser = {
						...user,
						balance: user.balance - operationData.value,
					};
					this._storageService.set('user', updatedUser);

					return updatedUser;
				}),
				catchError((error: HttpErrorResponse) => throwError(this?._toastService?.error(error?.error?.message)))
			);
	}

	makeTransaction(operationData: ITransaction) {
		if (!operationData.value || !operationData.to) {
			return throwError(this?._toastService?.warning('Informe o valor da transferência e selecione um usuário'));
		};

		return this._http.post(`${environment.api}/extract/transaction`, operationData)
			.pipe(
				take(1),
				map(() => {
					this?._toastService?.success('Transferência realizada com sucesso');
					const user = this._storageService.get<IUserLogged>('user');
					const updatedUser = {
						...user,
						balance: user.balance - operationData.value,
					};
					this._storageService.set('user', updatedUser);

					return updatedUser;
				}),
				catchError((error: HttpErrorResponse) => throwError(this?._toastService?.error(error?.error?.message)))
			);
	}

}
