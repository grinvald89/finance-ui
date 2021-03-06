import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'login',
                loadChildren: () => import('../modules/authentication/bootstrap/authentication.module').then(m => m.AuthenticationModule)
            },
            {
                canActivate: [AuthGuard],
                path: 'dashboard',
                loadChildren: () => import('../modules/dashboard/bootstrap/dashboard.module').then(m => m.DashboardModule)
            }
            // {
            //     canActivate: [AuthGuard],
            //     path: 'financial-transactions',
            //     loadChildren: () => import('../modules/financial-transactions/bootstrap/financial-transactions.module').then(m => m.FinancialTransactionsModule)
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
