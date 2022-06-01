import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FinancialTransactionsRoutingModule} from './financial-transactions-routing.module';
import { PipesModule } from 'src/modules/pipes/bootstrap/pipes.module';
import { FinancialTransactionsComponent } from '../ui/financial-transactions/financial-transactions.component';
import { TransactionEditorComponent } from '../ui/transaction-editor/transaction-editor.component';
import { TransactionTableHeaderComponent } from '../ui/transaction-table-header/transaction-table-header.component';
import { TransactionTableBodyComponent } from '../ui/transaction-table-body/transaction-table-body.component';

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
        MatProgressSpinnerModule,
        MatTableModule,
        MatRippleModule,
        MatDialogModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTooltipModule,
        PipesModule
    ],
    declarations: [
        FinancialTransactionsComponent,
        TransactionTableHeaderComponent,
        TransactionTableBodyComponent,
        TransactionEditorComponent
    ],
    exports: [
        FinancialTransactionsComponent
    ]
})
export class FinancialTransactionsModule { }
