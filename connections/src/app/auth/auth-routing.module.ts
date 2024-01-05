import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN_PAGE_ROUTE, REGISTRATION_PAGE_ROUTE } from '@core/constants/routing';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: REGISTRATION_PAGE_ROUTE, component: RegistrationPageComponent },
  { path: LOGIN_PAGE_ROUTE, component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
