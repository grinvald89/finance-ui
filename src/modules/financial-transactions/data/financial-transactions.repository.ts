import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as _ from 'lodash';

import { ITransaction, Transaction } from 'src/models/transaction';
import { ITransactionFilter, ITransactionPagination, TransactionTag } from 'src/models';
import { CONFIG } from 'src/config/config';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionsRepository {
    constructor(private readonly http: HttpClient) { }

    public getTransactionCount(filter: ITransactionFilter): Observable<number> {

        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const queryParams: string = `filter=${JSON.stringify(filter)}`;

        return this.http.get<number>(
            `${CONFIG.baseUrl}/api/transaction-count?${queryParams}`,
            {
                headers
            }
        );
    }

    public getTransactions(filter: ITransactionFilter, pagination: ITransactionPagination): Observable<Transaction[]> {

        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const queryParams: string = `filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}`;

        return this.http.get<ITransaction[]>(
            `${CONFIG.baseUrl}/api/transactions?${queryParams}`,
            {
                headers
            }
        )
            .pipe(
                map((transactions: ITransaction[]): Transaction[] =>
                    _.map(transactions, (item: ITransaction): Transaction => new Transaction(item))
                )
            );
    }

    public createTransaction(transaction: Transaction): Observable<Transaction> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<ITransaction>(
            `${CONFIG.baseUrl}/api/transactions`,
            {
                "CategoryId": transaction.Category.Id,
                "Comment": transaction.Comment,
                "DirectionId": transaction.Direction.Id,
                "PayerId": transaction.Payer.Id,
                "StatusId": transaction.Status.Id,
                "Summ": transaction.Summ,
                "TransactionDate": transaction.Date,
                "TagIds": _.map(transaction.Tags, (tag: TransactionTag): string => tag.Id),
                "TypeId": transaction.Type.Id
            },
            {
                headers
            }
        )
            .pipe(
                map((transaction: ITransaction): Transaction =>
                    new Transaction(transaction))
            );
    }

    public updateTransaction(transaction: Transaction): Observable<Transaction> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<ITransaction>(
            `${CONFIG.baseUrl}/api/transactions`,
            {
                "CategoryId": transaction.Category.Id,
                "Comment": transaction.Comment,
                "DirectionId": transaction.Direction.Id,
                "Id": transaction.Id,
                "PayerId": transaction.Payer.Id,
                "StatusId": transaction.Status.Id,
                "Summ": transaction.Summ,
                "TransactionDate": transaction.Date,
                "TagIds": _.map(transaction.Tags, (tag: TransactionTag): string => tag.Id),
                "TypeId": transaction.Type.Id
            },
            {
                headers
            }
        )
            .pipe(
                map((transaction: ITransaction): Transaction =>
                    new Transaction(transaction))
            );
    }
}