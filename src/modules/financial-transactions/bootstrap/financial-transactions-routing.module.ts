import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialTransactionsComponent } from '../ui/financial-transactions/financial-transactions.component';

const routes: Routes = [{
    path: '',
    component: FinancialTransactionsComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancialTransactionsRoutingModule { }