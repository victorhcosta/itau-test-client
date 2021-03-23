/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { IUser, IUserLogged } from '../../../user/models/login';
import { IExtractRegister } from '../../models/extract';
import { ExtractService } from '../../services/extract.service';
import { UserService } from '../../../user/services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-extract',
	templateUrl: './extract.component.html',
	styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit, AfterViewInit {
	user!: IUserLogged;
	columns: string[] = ['operation', 'value', 'date'];
	operationForm: FormGroup = new FormGroup({});
	users$: Observable<IUser[]> = new Observable();
	extractDataSource = new MatTableDataSource<IExtractRegister>();

	@ViewChild(MatPaginator) paginator?: MatPaginator;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _router: Router,
		private readonly _storageService: LocalStorageService,
		private readonly _extractService: ExtractService,
		private readonly _userService: UserService,
	) { }

	ngOnInit(): void {
		this.user = this._storageService.get('user');

		this._buildForm();
		this._getUsers();
		this._getExtract();
	}

	ngAfterViewInit() {
		if (this.paginator) {
			this.extractDataSource.paginator = this.paginator;
		};
	}

	makeDeposit() {
		this._extractService
			.makeDeposit(this.operationForm.value)
			.subscribe(
				user => {
					this.user = user;
					this._getExtract();
				},
				() => {},
			);
	}

	makeWithdraw() {
		this._extractService
			.makeWithdraw(this.operationForm.value)
			.subscribe(
				user => {
					this.user = user;
					this._getExtract();
				},
				() => {},
			);
	}

	makeTransaction() {
		this._extractService
			.makeTransaction(this.operationForm.value)
			.subscribe(
				user => {
					this.user = user;
					this._getExtract();
				},
				() => {},
			);
	}

	logout() {
		this._userService
			.logout()
			.then(
				() => this._router.navigate(['/']),
			);
	}

	deleteAccount() {
		this._userService
			.deleteAccount()
			.subscribe(
				() => this.logout(),
			);
	}

	private _getExtract() {
		this._extractService
			.getExtract()
			.subscribe(
				extract => this.extractDataSource.data = extract,
				() => { },
			);
	}

	private _getUsers() {
		this.users$ = this._userService.getAll();
	}

	private _buildForm() {
		this.operationForm = this._formBuilder.group({
			value: [0, Validators.required],
			to: ['', Validators.required],
		});
	}
}
