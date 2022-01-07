import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionCategory, TransactionCategoryOption, TransactionStatus, TransactionSubCategory, TransactionSubCategoryFirstOption, TransactionSubCategorySecondOption, TransactionType, User } from 'src/models';
import { FinancialTransactionFilterRepository } from '../data';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionFilterFacade {
    constructor(private readonly filterRepository: FinancialTransactionFilterRepository) { }

    public getTransactionCategories(): Observable<TransactionCategory[]> {
        return this.filterRepository.getTransactionCategories();
    }

    public getTransactionCategoryOptions(): Observable<TransactionCategoryOption[]> {
        return this.filterRepository.getTransactionCategoryOptions();
    }

    public getTransactionStatuses(): Observable<TransactionStatus[]> {
        return this.filterRepository.getTransactionStatuses();
    }

    public getTransactionSubCategories(): Observable<TransactionSubCategory[]> {
        return this.filterRepository.getTransactionSubCategories();
    }

    public getTransactionSubCategoryFirstOptions(): Observable<TransactionSubCategoryFirstOption[]> {
        return this.filterRepository.getTransactionSubCategoryFirstOptions();
    }

    public getTransactionSubCategorySecondOptions(): Observable<TransactionSubCategorySecondOption[]> {
        return this.filterRepository.getTransactionSubCategorySecondOptions();
    }

    public getTransactionTypes(): Observable<TransactionType[]> {
        return this.filterRepository.getTransactionTypes();
    }

    public getUsers(): Observable<User[]> {
        return this.filterRepository.getUsers();
    }
}