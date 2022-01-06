import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionStatus, TransactionType, User } from 'src/models';
import { FinancialTransactionFilterRepository } from '../data';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionFilterFacade {
    constructor(private readonly filterRepository: FinancialTransactionFilterRepository) { }

    public getTransactionStatuses(): Observable<TransactionStatus[]> {
        return this.filterRepository.getTransactionStatuses();
    }

    public getTransactionTypes(): Observable<TransactionType[]> {
        return this.filterRepository.getTransactionTypes();
    }

    public getUsers(): Observable<User[]> {
        return this.filterRepository.getUsers();
    }
}