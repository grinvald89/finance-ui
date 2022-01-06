import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as _ from 'lodash';

import { ITransactionType, TransactionType } from 'src/models';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionFilterRepository {
    constructor(private readonly http: HttpClient) { }

    public getTransactionTypes(): Observable<TransactionType[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransactionType[]>(
            'https://localhost:7062/api/transaction-types',
            {
                headers
            }
        )
            .pipe(
                map((transactionTypes: ITransactionType[]): TransactionType[] =>
                    _.map(transactionTypes, (item) => new TransactionType(item)))
            );
    }
}