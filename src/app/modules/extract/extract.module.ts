import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ExtractRoutingModule } from './extract-routing.module';
import { ExtractComponent } from './pages/extract/extract.component';

@NgModule({
	declarations: [ExtractComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ExtractRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
	]
})
export class ExtractModule { }
