import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs';
import * as Swal from 'sweetalert2';
import * as moment from 'moment';
import * as _ from 'lodash';

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

const DISPLAYED_COLUMNS: string[] = [
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

@Component({
    selector: 'financial-transactions',
    templateUrl: './financial-transactions.component.html',
    styleUrls: ['./financial-transactions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialTransactionsComponent {
    private isTransactionLoaded: boolean = false;
    private pagination: IPagination = INIT_PAGINATION;
    private transactionGroups: ITransactionGroup[] = [];
    private transactionFilter!: ITransactionFilter;

    public displayedColumns: string[] = DISPLAYED_COLUMNS;

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
            this.Pagination = INIT_PAGINATION;
            this.loadTransactionCount(value);
            this.loadTransactions(
                value, {
                    count: this.pagination.pageSize,
                    offset: this.pagination.pageSize * (this.pagination.pageIndex)
                });
        }
    }

    get IsTransactionLoaded(): boolean {
        return this.isTransactionLoaded;
    }
    set IsTransactionLoaded(value: boolean) {
        this.isTransactionLoaded = value;
        this.changeDetector.detectChanges();
    }

    get Pagination(): IPagination {
        return this.pagination;
    }
    set Pagination(value: IPagination) {
        this.pagination = value;
        this.changeDetector.detectChanges();
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

    public onPageEvent(event: PageEvent) {
        let pageIndex: number = event.pageIndex;

        if (this.pagination.pageSize !== event.pageSize) {
            pageIndex = INIT_PAGINATION.pageIndex;
        }

        this.Pagination = {
            ...this.pagination,
            pageIndex: pageIndex,
            pageSize: event.pageSize
        }

        if (!_.isEmpty(this.transactionFilter)) {
            this.loadTransactions(
                this.transactionFilter, {
                    count: this.pagination.pageSize,
                    offset: this.pagination.pageSize * (this.pagination.pageIndex)
                });
        }
    }

    private loadTransactionCount(filter: ITransactionFilter): void {
        this.financialTransactionsFacade.getTransactionCount(filter)
            .subscribe((transactionCount: number): void => {
                this.Pagination = {
                    ...this.pagination,
                    length: transactionCount
                };
            });
    }

    private loadTransactions(filter: ITransactionFilter, pagination: ITransactionPagination): void {
        this.IsTransactionLoaded = false;

        this.financialTransactionsFacade.getTransactions(filter, pagination)
            .pipe(finalize((): boolean => this.IsTransactionLoaded = true))
            .subscribe({
                next: (transactions: Transaction[]): void => this.formTransactionGroups(transactions),
                error: (err: any): void => this.showError({
                    text: 'Ошибка!',
                    title: 'Не удалось загрузить список транзакций.'
                }),
            });
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
