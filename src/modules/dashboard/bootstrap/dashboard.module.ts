import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { DashboardRoutingModule} from './dashboard-routing.module';
import { DashboardComponent } from '../ui/dashboard/dashboard.component';
import { FinancialTransactionFilterModule } from 'src/modules/financial-transaction-filter/bootstrap/financial-transaction-filter.module';
import { FinancialTransactionsModule } from 'src/modules/financial-transactions/bootstrap/financial-transactions.module';
import { PipesModule } from 'src/modules/pipes/bootstrap/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        FinancialTransactionFilterModule,
        FinancialTransactionsModule,
        PipesModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }
