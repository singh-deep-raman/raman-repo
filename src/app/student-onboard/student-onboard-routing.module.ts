import { StudentOnboardComponent } from './student-onboard.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'onboard',
      component: StudentOnboardComponent,
      canActivate: [AuthGuard]
    }
  ])],
  exports: [
    RouterModule
  ]
})
export class StudentOnboardRoutingModule {

}
