import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/**
 * This class acts as routing guide for Login module
 *
 * @export
 * @class LoginRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'login',
      component: LoginComponent
    }
  ])],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {

}
