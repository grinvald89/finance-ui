import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { FinancialTransactionsRoutingModule} from './financial-transactions-routing.module';
import { FinancialTransactionsComponent } from '../ui/financial-transactions/financial-transactions.component';

@NgModule({
    imports: [
        CommonModule,
        FinancialTransactionsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        FinancialTransactionsComponent
    ]
})
export class FinancialTransactionsModule { }
