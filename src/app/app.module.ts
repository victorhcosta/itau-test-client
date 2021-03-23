import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
	NgxUiLoaderModule,
	SPINNER,
	NgxUiLoaderHttpModule,
	NgxUiLoaderRouterModule,
	POSITION
} from 'ngx-ui-loader';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetTokenInterceptor } from './modules/shared/interceptors/set-token.interceptor';
import { UnauthorizedInterceptor } from './modules/shared/interceptors/unauthorized.interceptor';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		ToastrModule.forRoot({
			autoDismiss: true,
			closeButton: true,
			countDuplicates: false,
			preventDuplicates: true,
			progressAnimation: 'increasing',
			progressBar: true
		}),
		LocalStorageModule.forRoot({
			prefix: '',
			storageType: 'sessionStorage',
		}),
		NgxUiLoaderModule.forRoot({
			bgsType: SPINNER.ballSpinFadeRotating,
			bgsColor: '#eeeeee',
			bgsPosition: POSITION.topLeft,
			bgsSize: 50,
			blur: 0,
		}),
		NgxUiLoaderHttpModule.forRoot({
			showForeground: false,
		}),
		NgxUiLoaderRouterModule.forRoot({
			showForeground: false,
		}),
	],
	providers: [
		{ provide: LocationStrategy, useClass: PathLocationStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: SetTokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
