export interface ILogin {
	nickname: string;
	password: string;
};

export interface ILoginResponse {
	token: string;
};

export interface ICreateUser extends ILogin {
	name: string;
	surname: string;
};

export interface IUser {
	_id: string;
	name: string;
	nickname: string;
	surname: string;
};

export interface IUserLogged extends IUser {
	balance: number;
};
