import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/in-memory-data.service';
import { StudentListModule } from './student-list/student-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentOnboardModule } from './student-onboard/student-onboard.module';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StudentService } from './shared/services/student.service';
import { LoginModule } from './login/login.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    LoginModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    StudentListModule,
    AngularFontAwesomeModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StudentOnboardModule,
    MenubarModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule
  ],
  providers: [ConfirmationService, AuthGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
