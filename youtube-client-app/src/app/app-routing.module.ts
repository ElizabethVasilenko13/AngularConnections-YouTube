import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADMIN_PAGE_ROUTE, AUTH_PAGE_ROUTE, FAVORITE_PAGE_ROUTE } from '@core/consts';
import { AuthGuard } from '@auth/guards/guards.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: AUTH_PAGE_ROUTE, pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./youTubeApp/youTubeApp.module').then((m) => m.YouTubeAppModule),
  },
  { path: AUTH_PAGE_ROUTE, loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {
    path: ADMIN_PAGE_ROUTE,
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: FAVORITE_PAGE_ROUTE,
    canActivate: [AuthGuard],
    loadChildren: () => import('./favorite/favorite.module').then((m) => m.FavoriteModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
