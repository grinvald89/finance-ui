import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FinancialTransactionFilterComponent } from '../ui/financial-transaction-filter/financial-transaction-filter.component';
import { TransactionTypesComponent } from '../ui/financial-transaction-filter/transaction-types/transaction-types.component';
import { TransactionStatusesComponent } from '../ui/financial-transaction-filter/transaction-statuses/transaction-statuses.component';
import { UsersComponent } from '../ui/financial-transaction-filter/users/users.component';
import { FullnamePipe } from '../ui/financial-transaction-filter/users/fullname.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [
        FinancialTransactionFilterComponent,
        TransactionTypesComponent,
        TransactionStatusesComponent,
        UsersComponent,
        FullnamePipe
    ],
    exports: [FinancialTransactionFilterComponent]
})
export class FinancialTransactionFilterModule { }
