import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { PipesModule } from '../../pipes/bootstrap/pipes.module';
import { FinancialTransactionFilterComponent } from '../ui/financial-transaction-filter/financial-transaction-filter.component';
import { TransactionTypesComponent } from '../ui/financial-transaction-filter/transaction-types/transaction-types.component';
import { TransactionStatusesComponent } from '../ui/financial-transaction-filter/transaction-statuses/transaction-statuses.component';
import { PayersComponent } from '../ui/financial-transaction-filter/payers/payers.component';
import { PeriodComponent } from '../ui/financial-transaction-filter/period/period.component';
import { TransactionDirectionsComponent } from '../ui/financial-transaction-filter/transaction-directions/transaction-directions.component';
import { TransactionCategoriesComponent } from '../ui/financial-transaction-filter/transaction-categories/transaction-categories.component';
import { TransactionTagsComponent } from '../ui/financial-transaction-filter/transaction-tags/transaction-tags.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        PipesModule
    ],
    declarations: [
        FinancialTransactionFilterComponent,
        TransactionTypesComponent,
        TransactionStatusesComponent,
        PayersComponent,
        PeriodComponent,
        TransactionDirectionsComponent,
        TransactionCategoriesComponent,
        TransactionTagsComponent
    ],
    exports: [FinancialTransactionFilterComponent],
    providers: [
        MatDatepickerModule,
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'ru-RU'
        }
    ],
})
export class FinancialTransactionFilterModule { }
