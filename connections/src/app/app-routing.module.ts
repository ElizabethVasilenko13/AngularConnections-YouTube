import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTE } from '@core/constants/routing';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  {
    path: AUTH_ROUTE,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./connections/connections.module').then(
        (m) => m.ConnectionsModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
