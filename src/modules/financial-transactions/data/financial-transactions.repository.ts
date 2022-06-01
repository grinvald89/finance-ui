import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as _ from 'lodash';

import { ITransaction, Transaction } from 'src/models/transaction';
import { ITransactionFilter, TransactionTag } from 'src/models';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionsRepository {
    constructor(private readonly http: HttpClient) { }

    public getTransactions(filter: ITransactionFilter): Observable<Transaction[]> {

        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransaction[]>(
            `https://localhost:7062/api/transactions?filter=${JSON.stringify(filter)}`,
            // {
            //     categoryIds: filter.categoryIds,
            //     directionIds: filter.directionIds,
            //     payerIds: filter.payerIds,
            //     statusIds: filter.statusIds,
            //     tagIds: filter.tagIds,
            //     typeIds: filter.typeIds
            // },
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

        return this.http.put<ITransaction>(
            'https://localhost:7062/api/transactions',
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
            'https://localhost:7062/api/transactions',
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