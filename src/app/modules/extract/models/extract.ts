import { IUserLogged } from '../../user/models/login';

export interface IExtractRegister {
	value: number;
	operation: string;
	from: string;
	to: string;
	ownerAccountNickName: string;
	date: Date;
}

export interface IExtractRegisterFromAPI {
	value: number;
	operationType: 'deposit' | 'withdraw';
	from: string;
	to: string;
	ownerAccountNickName: string;
	date: Date;
}

export interface IDeposit extends IExtractRegister {
	operationType: 'deposit';
};

export interface IWithdraw extends IExtractRegister {
	operationType: 'withdraw';
};

export interface IOperation {
	value: number;
}

export interface ITransaction extends IOperation {
	to: string;
}
