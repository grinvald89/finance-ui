import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DashboardRoutingModule} from './dashboard-routing.module';
import { DashboardComponent } from '../ui/dashboard/dashboard.component';
import { FinancialTransactionFilterModule } from 'src/modules/financial-transaction-filter/bootstrap/financial-transaction-filter.module';

@NgModule({
    imports: [
        // BrowserModule,
        CommonModule,
        DashboardRoutingModule,
        MatProgressSpinnerModule,
        FinancialTransactionFilterModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }
