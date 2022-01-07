import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { FinancialTransactionFilterComponent } from '../ui/financial-transaction-filter/financial-transaction-filter.component';
import { TransactionTypesComponent } from '../ui/financial-transaction-filter/transaction-types/transaction-types.component';
import { TransactionStatusesComponent } from '../ui/financial-transaction-filter/transaction-statuses/transaction-statuses.component';
import { UsersComponent } from '../ui/financial-transaction-filter/users/users.component';
import { FullnamePipe } from '../ui/financial-transaction-filter/users/fullname.pipe';
import { DatesComponent } from '../ui/financial-transaction-filter/dates/dates.component';
import { TransactionCategoriesComponent } from '../ui/financial-transaction-filter/transaction-categories/transaction-categories.component';
import { TransactionCategoryOptionsComponent } from '../ui/financial-transaction-filter/transaction-category-options/transaction-category-options.component';
import { TransactionSubcategoriesComponent } from '../ui/financial-transaction-filter/transaction-subcategories/transaction-subcategories.component';
import { TransactionSubcategoryFirstOptionsComponent } from '../ui/financial-transaction-filter/transaction-subcategory-first-options/transaction-subcategory-first-options.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        FinancialTransactionFilterComponent,
        TransactionTypesComponent,
        TransactionStatusesComponent,
        UsersComponent,
        FullnamePipe,
        DatesComponent,
        TransactionCategoriesComponent,
        TransactionCategoryOptionsComponent,
        TransactionSubcategoriesComponent,
        TransactionSubcategoryFirstOptionsComponent
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
