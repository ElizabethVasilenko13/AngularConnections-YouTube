import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTE } from '@core/constants/routing';
import { authGuard } from './auth/guards/auth.guard';
import { AuthRedirectGuard } from '@auth/guards/auth-redirect-guard.guard';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  {
    path: AUTH_ROUTE,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthRedirectGuard],
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./connections/connections.module').then(
        (m) => m.ConnectionsModule,
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
