import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentOnboardComponent } from './student-onboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

/**
 *
 *
 * @export
 * @class StudentOnboardModule
 */
@NgModule({
  declarations: [StudentOnboardComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    CalendarModule
  ],
})
export class StudentOnboardModule { }
