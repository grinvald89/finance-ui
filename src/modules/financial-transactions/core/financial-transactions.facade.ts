import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITransactionFilter, ITransactionPagination, Transaction } from 'src/models';
import { FinancialTransactionsRepository } from '../data/financial-transactions.repository';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionsFacade {
    constructor(
        private readonly financialTransactionsRepository: FinancialTransactionsRepository
    ) { }

    public getTransactionCount(filter: ITransactionFilter): Observable<number> {
        return this.financialTransactionsRepository.getTransactionCount(filter);
    }

    public getTransactions(filter: ITransactionFilter, pagination: ITransactionPagination): Observable<Transaction[]> {
        return this.financialTransactionsRepository.getTransactions(filter, pagination);
    }

    public createTransaction(transaction: Transaction): Observable<Transaction> {
        return this.financialTransactionsRepository.createTransaction(transaction);
    }

    public updateTransaction(transaction: Transaction): Observable<Transaction> {
        return this.financialTransactionsRepository.updateTransaction(transaction);
    }
}