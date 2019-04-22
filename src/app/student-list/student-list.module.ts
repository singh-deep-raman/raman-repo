import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list.component';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { StudentFiltersComponent } from './student-filters/student-filters.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StudentListComponent, StudentFiltersComponent],
  imports: [
    CommonModule,
    DataViewModule,
    PanelModule,
    ButtonModule,
    FormsModule,
    ConfirmDialogModule,
    RouterModule
  ],
  exports: [DataViewModule, ConfirmDialogModule]
})
export class StudentListModule { }
