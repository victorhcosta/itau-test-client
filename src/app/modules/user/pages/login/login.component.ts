import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup = new FormGroup({});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _router: Router,
		private readonly _userService: UserService,
	) {
		this._buildForm();
	}

	submit() {
		this._userService
			.authenticate(this.loginForm.value)
			.subscribe(
				() => this._router.navigate(['/extrato']),
				() => { },
			);
	}

	ngOnInit(): void {
	}

	private _buildForm() {
		this.loginForm = this._formBuilder.group({
			nickname: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

}
