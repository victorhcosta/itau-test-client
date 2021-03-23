import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup = new FormGroup({});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _router: Router,
		private readonly _userService: UserService,
	) {
		this._buildForm();
	}

	submit() {
		this._userService
			.createAccount(this.registerForm.value)
			.subscribe(
				() => this._router.navigate(['/']),
				() => { },
			);
	}

	ngOnInit(): void {
	}

	private _buildForm() {
		this.registerForm = this._formBuilder.group({
			name: ['', Validators.required],
			surname: ['', Validators.required],
			nickname: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

}
