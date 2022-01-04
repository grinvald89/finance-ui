import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TypeTransaction } from './type-transaction';
// import { TYPES_TRANSACTIONS } from '../data';

@Injectable({
    providedIn: 'root'
})
export class FinancialTransactionFilterFacade {
    public getTypesTransactions(): Observable<TypeTransaction[]> {
        return of(/*TYPES_TRANSACTIONS*/ []);
    }
}