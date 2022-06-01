import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ITransactionFilter, Transaction } from 'src/models';
import { FinancialTransactionsRepository } from '../data/financial-transactions.repository';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionsFacade {
    constructor(
        private readonly financialTransactionsRepository: FinancialTransactionsRepository
    ) { }

    public getTransactions(filter: ITransactionFilter): Observable<Transaction[]> {
        return this.financialTransactionsRepository.getTransactions(filter);
    }

    public createTransaction(transaction: Transaction): Observable<Transaction> {
        return this.financialTransactionsRepository.createTransaction(transaction);
    }

    public updateTransaction(transaction: Transaction): Observable<Transaction> {
        return this.financialTransactionsRepository.updateTransaction(transaction);
    }
}