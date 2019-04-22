import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListRoutingModule } from './student-list/student-list-routing.module';
import { StudentOnboardRoutingModule } from './student-onboard/student-onboard-routing.module';
import { StudentListComponent } from './student-list/student-list.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: StudentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),
    StudentListRoutingModule,
    StudentOnboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
