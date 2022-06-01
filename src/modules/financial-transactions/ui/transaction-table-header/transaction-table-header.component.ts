import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { Transaction } from 'src/models/transaction';

@Component({
    selector: 'transaction-table-header',
    templateUrl: './transaction-table-header.component.html',
    styleUrls: ['./transaction-table-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionTableHeaderComponent {
    displayedColumns: string[] = [
        'summ',
        'status',
        'type',
        'payer',
        'direction',
        'category',
        'tags',
        'comment'
    ];

    private transactions: Transaction[] = [];

    @Output() OpenTransactionEditor: EventEmitter<Transaction> = new EventEmitter<Transaction>();

    @Input('Transactions')
    set Transactions(value: Transaction[]) {
        this.transactions = value;
    }
    get Transactions(): Transaction[] {
        return this.transactions;
    }

    public openTransactionEditor(transaction: Transaction) {
        this.OpenTransactionEditor.emit(transaction);
    }
}
