import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as Swal from 'sweetalert2';

import { FinancialTransactionsFacade } from '../../core';
import { TransactionEditorComponent } from '../transaction-editor/transaction-editor.component';
import { ITransactionFilter, ITransactionPagination, Transaction } from 'src/models';
import { IPagination } from './pagination.interface';

interface ITransactionGroup {
    date: string;
    transactions: Transaction[];
}

interface IErrorAlert {
    readonly title: string;
    readonly text: string;
}

const INIT_PAGINATION: IPagination = {
    length: 0,
    loaded: false,
    pageIndex: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100]
};

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

    private transactionGroups: ITransactionGroup[] = [];
    private transactionFilter!: ITransactionFilter;

    public pagination: IPagination = INIT_PAGINATION;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly financialTransactionsFacade: FinancialTransactionsFacade,
        public dialog: MatDialog
    ) { }

    public onPageEvent(event: PageEvent) {
        this.pagination.pageIndex = event.pageIndex;
        this.pagination.pageSize = event.pageSize;

        if (!_.isEmpty(this.transactionFilter)) {
            this.loadTransactions(
                this.transactionFilter, {
                    count: this.pagination.pageSize,
                    offset: this.pagination.pageSize * (this.pagination.pageIndex)
                });
        }
    }

    @Input('TransactionFilter')
    get TransactionFilter(): ITransactionFilter {
        return this.transactionFilter;
    }
    set TransactionFilter(value: ITransactionFilter) {
        this.transactionFilter = value;

        if (!_.isEmpty(this.transactionFilter)) {
            this.loadTransactionCount(value);
            this.loadTransactions(
                value, {
                    count: this.pagination.pageSize,
                    offset: this.pagination.pageSize * (this.pagination.pageIndex)
                });
        }
    }

    get TransactionGroups(): ITransactionGroup[] {
        return this.transactionGroups;
    }
    set TransactionGroups(value: ITransactionGroup[]) {
        this.transactionGroups = value;
        this.changeDetector.detectChanges();
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
                        .subscribe({
                            next: (transaction: Transaction): void => this.updateTransactionInTable(transaction),
                            error: (err: any): void => this.showError({
                                title: 'Ошибка!',
                                text: 'Не удалось создать транзакцию.'
                            })
                        });
                } else {
                    this.financialTransactionsFacade.updateTransaction(transaction)
                        .subscribe({
                            next: (transaction: Transaction): void => this.updateTransactionInTable(transaction),
                            error: (err: any): void => this.showError({
                                title: 'Ошибка!',
                                text: 'Не удалось сохранить транзакцию.'
                            })
                        });
                }
            });
    }

    public cloneTransaction(transaction: Transaction): void {
        this.financialTransactionsFacade.createTransaction(transaction)
            .subscribe((transaction: Transaction): void => this.updateTransactionInTable(transaction));
    }

    private loadTransactionCount(filter: ITransactionFilter): void {
        this.financialTransactionsFacade.getTransactionCount(filter)
            .subscribe((transactionCount: number): void => {
                this.pagination.length = transactionCount;
            });
    }

    private loadTransactions(filter: ITransactionFilter, pagination: ITransactionPagination): void {
        this.financialTransactionsFacade.getTransactions(filter, pagination)
            .subscribe((transactions: Transaction[]): void => this.formTransactionGroups(transactions));
    }

    private updateTransactionInTable(transaction: Transaction): void {
        let transactions: Transaction[] = [];
        _.forEach(this.TransactionGroups, (item: ITransactionGroup): void => {
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

        const result: ITransactionGroup[] = [];
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

    private showError(alert: IErrorAlert): void {
        Swal.default.fire({
            title: alert.title,
            text: alert.text
        });
    }
}
