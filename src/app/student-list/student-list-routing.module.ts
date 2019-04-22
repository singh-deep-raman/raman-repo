import { StudentListComponent } from './student-list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'students',
      component: StudentListComponent,
      canActivate: [AuthGuard]
    }
  ])],
  exports: [
    RouterModule
  ]
})
export class StudentListRoutingModule {

}
