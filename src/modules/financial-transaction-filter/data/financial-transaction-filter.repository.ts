import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as _ from 'lodash';

import {
    ITransactionCategory,
    ITransactionCategoryOption,
    ITransactionStatus,
    ITransactionType,
    IUser,
    TransactionCategory,
    TransactionCategoryOption,
    TransactionStatus,
    TransactionType,
    User
} from 'src/models';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionFilterRepository {
    constructor(private readonly http: HttpClient) { }

    public getTransactionCategories(): Observable<TransactionCategory[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransactionCategory[]>(
            'https://localhost:7062/api/transaction-categories',
            {
                headers
            }
        )
            .pipe(
                map((transactionCategories: ITransactionCategory[]): TransactionCategory[] =>
                    _.map(transactionCategories, (item) => new TransactionCategory(item)))
            );
    }

    public getTransactionCategoryOptions(): Observable<TransactionCategoryOption[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransactionCategoryOption[]>(
            'https://localhost:7062/api/transaction-category-options',
            {
                headers
            }
        )
            .pipe(
                map((transactionCategoryOptions: ITransactionCategoryOption[]): TransactionCategoryOption[] =>
                    _.map(transactionCategoryOptions, (item) => new TransactionCategoryOption(item)))
            );
    }

    public getTransactionStatuses(): Observable<TransactionStatus[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransactionType[]>(
            'https://localhost:7062/api/transaction-statuses',
            {
                headers
            }
        )
            .pipe(
                map((transactionStatuses: ITransactionStatus[]): TransactionStatus[] =>
                    _.map(transactionStatuses, (item) => new TransactionStatus(item)))
            );
    }

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

    public getUsers(): Observable<User[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<IUser[]>(
            'https://localhost:7062/api/users',
            {
                headers
            }
        )
            .pipe(
                map((users: IUser[]): User[] =>
                    _.map(users, (item) => new User(item)))
            );
    }
    
}