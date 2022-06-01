import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { Transaction } from 'src/models/transaction';

@Component({
    selector: 'transaction-table-body',
    templateUrl: './transaction-table-body.component.html',
    styleUrls: ['./transaction-table-body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionTableBodyComponent {
    displayedColumns: string[] = [
        'summ',
        'status',
        'type',
        'payer',
        'direction',
        'category',
        'tags',
        'comment',
        'clone-btn'
    ];

    private transactions: Transaction[] = [];

    @Output() OpenTransactionEditor: EventEmitter<Transaction> = new EventEmitter<Transaction>();
    @Output() CloneTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>();

    @Input('Transactions')
    set Transactions(value: Transaction[]) {
        this.transactions = value;
    }
    get Transactions(): Transaction[] {
        return this.transactions;
    }

    public openTransactionEditor(transaction: Transaction): void {
        this.OpenTransactionEditor.emit(transaction);
    }

    public cloneTransaction(event: MouseEvent, transaction: Transaction): void {
        this.CloneTransaction.emit(transaction);
        event.stopPropagation();

    }
}
