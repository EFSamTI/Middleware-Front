import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/authguard';
import { LayoutComponent } from './home/layout/layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// export const AuthGuard: CanActivateFn = (): boolean => {
//   const authenticationService = inject(AuthenticationService);
//   if (authenticationService.isLoggedIn()) {
//     return true;
//   }
//   authenticationService.redirectToLoginPage();
//   return false;
// };

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
