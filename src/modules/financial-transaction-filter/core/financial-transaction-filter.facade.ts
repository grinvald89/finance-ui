import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionType } from 'src/models';
import { FinancialTransactionFilterRepository } from '../data';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionFilterFacade {
    constructor(private readonly filterRepository: FinancialTransactionFilterRepository) { }

    public getTransactionTypes(): Observable<TransactionType[]> {
        return this.filterRepository.getTransactionTypes();
    }
}