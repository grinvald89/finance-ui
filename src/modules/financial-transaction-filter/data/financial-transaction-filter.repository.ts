import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as _ from 'lodash';

import {
    ITransactionCategory,
    ITransactionDirection,
    ITransactionStatus,
    ITransactionTag,
    ITransactionType,
    IUser,
    TransactionCategory,
    TransactionDirection,
    TransactionStatus,
    TransactionTag,
    TransactionType,
    User
} from 'src/models';
import { CONFIG } from 'src/config/config';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionFilterRepository {
    constructor(private readonly http: HttpClient) { }

    public getTransactionDirections(): Observable<TransactionDirection[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransactionDirection[]>(
            `${CONFIG.baseUrl}/api/transaction-directions`,
            {
                headers
            }
        )
            .pipe(
                map((transactionDirections: ITransactionDirection[]): TransactionDirection[] =>
                    _.map(transactionDirections, (item) => new TransactionDirection(item)))
            );
    }

    public getTransactionCategories(): Observable<TransactionCategory[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransactionCategory[]>(
            `${CONFIG.baseUrl}/api/transaction-categories`,
            {
                headers
            }
        )
            .pipe(
                map((transactionCategories: ITransactionCategory[]): TransactionCategory[] =>
                    _.map(transactionCategories, (item) => new TransactionCategory(item)))
            );
    }

    public getTransactionStatuses(): Observable<TransactionStatus[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransactionType[]>(
            `${CONFIG.baseUrl}/api/transaction-statuses`,
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
            `${CONFIG.baseUrl}/api/transaction-types`,
            {
                headers
            }
        )
            .pipe(
                map((transactionTypes: ITransactionType[]): TransactionType[] =>
                    _.map(transactionTypes, (item) => new TransactionType(item)))
            );
    }

    public getTransactionTags(): Observable<TransactionTag[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<ITransactionTag[]>(
            `${CONFIG.baseUrl}/api/transaction-tags`,
            {
                headers
            }
        )
            .pipe(
                map((transactionTags: ITransactionTag[]): TransactionTag[] =>
                    _.map(transactionTags, (item) => new TransactionTag(item)))
            );
    }

    public getUsers(): Observable<User[]> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.get<IUser[]>(
            `${CONFIG.baseUrl}/api/users`,
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