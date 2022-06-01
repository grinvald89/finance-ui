import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import * as _ from 'lodash';

import { FinancialTransactionsFacade } from '../../core';
import { TransactionEditorComponent } from '../transaction-editor/transaction-editor.component';
import { ITransactionFilter, Transaction } from 'src/models';

interface TransactionGroup {
    date: string,
    transactions: Transaction[]
}

@Component({
    selector: 'financial-transactions',
    templateUrl: './financial-transactions.component.html',
    styleUrls: ['./financial-transactions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialTransactionsComponent {
    displayedColumns: string[] = [
        'date',
        'summ',
        'status',
        'type',
        'payer',
        'direction',
        'category',
        'tags',
        'comment'
    ];

    private transactionGroups: TransactionGroup[] = [];
    private transactionFilter!: ITransactionFilter;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly financialTransactionsFacade: FinancialTransactionsFacade,
        public dialog: MatDialog
    ) { }

    @Input('TransactionFilter')
    get TransactionFilter(): ITransactionFilter {
        return this.transactionFilter;
    }
    set TransactionFilter(value: ITransactionFilter) {
        this.transactionFilter = value;

        if (!_.isEmpty(this.transactionFilter)) {
            this.loadTransactions(value);
        }
    }

    get TransactionGroups(): TransactionGroup[] {
        return this.transactionGroups;
    }
    set TransactionGroups(value: TransactionGroup[]) {
        this.transactionGroups = value;
        this.changeDetector.detectChanges();
    }

    public loadTransactions(filter: ITransactionFilter): void {
        this.financialTransactionsFacade.getTransactions(filter)
            .subscribe((transactions: Transaction[]): void => this.formTransactionGroups(transactions));
    }

    public openTransactionEditor(transaction?: Transaction): void {
        const dialogRef = this.dialog.open(TransactionEditorComponent, {
            width: '1000px',
            data: transaction
        });

        dialogRef.afterClosed()
            .subscribe((transaction?: Transaction): void => {
                if (_.isNil(transaction)) {
                    return;
                }

                if (_.isEmpty(transaction.Id)) {
                    this.financialTransactionsFacade.createTransaction(transaction)
                        .subscribe((transaction: Transaction): void => this.updateTransactionInTable(transaction));
                } else {
                    this.financialTransactionsFacade.updateTransaction(transaction)
                        .subscribe((transaction: Transaction): void => this.updateTransactionInTable(transaction));
                }
            });
    }

    public cloneTransaction(transaction: Transaction): void {
        this.financialTransactionsFacade.createTransaction(transaction)
            .subscribe((transaction: Transaction): void => this.updateTransactionInTable(transaction));
    }

    private updateTransactionInTable(transaction: Transaction): void {
        let transactions: Transaction[] = [];
        _.forEach(this.TransactionGroups, (item: TransactionGroup): void => {
            transactions = _.concat(transactions, item.transactions)
        });

        const transactionIndex: number =
            _.findIndex(transactions, (item: Transaction): boolean => transaction.Id === item.Id);

        if (transactionIndex === -1) {
            transactions = _.concat(transactions, transaction);
        } else {
            transactions[transactionIndex] = transaction;
            transactions = _.clone(transactions);
        }

        this.formTransactionGroups(transactions);
    }

    private formTransactionGroups(transactions: Transaction[]): void {
        transactions = _.orderBy(transactions, ['date']);
        const transactionGroups: { [date: string]: Transaction[] } = { };

        _.forEach(transactions, (item: Transaction): void => {
            const date: string = moment(item.Date).format('DD.MM.yyyy');

            if (!_.has(transactionGroups, date)) {
                transactionGroups[date] = [];
            }

            transactionGroups[date].push(item);
        });

        const result: TransactionGroup[] = [];
        for (const date in transactionGroups) {
            if (_.has(transactionGroups, date)) {
                result.push({
                    date: date,
                    transactions: transactionGroups[date]
                });
            }
        }

        this.TransactionGroups = result;
    }
}
