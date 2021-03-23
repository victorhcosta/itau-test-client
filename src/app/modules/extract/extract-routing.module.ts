import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticadedGuard } from '../shared/guards/authenticaded.guard';

import { ExtractComponent } from './pages/extract/extract.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ExtractComponent,
		// canActivate: [AuthenticadedGuard],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ExtractRoutingModule { }
