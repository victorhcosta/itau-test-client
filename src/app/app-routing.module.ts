import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'deslogado',
	},
	{
		path: 'deslogado',
		loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
	},
	{
		path: 'extrato',
		loadChildren: () => import('./modules/extract/extract.module').then(m => m.ExtractModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
