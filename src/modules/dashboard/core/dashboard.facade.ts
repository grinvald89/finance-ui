import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardRepository } from '../data';
import { ITransactionFilter, ITransactionTotalAmount } from 'src/models';

@Injectable({
    providedIn: 'root'
})
export class DashboardFacade {
    constructor(private readonly dashboardRepository: DashboardRepository) { }

    public getTransactionTotalAmount(filter: ITransactionFilter): Observable<ITransactionTotalAmount> {
        return this.dashboardRepository.getTransactionTotalAmount(filter);
    }
}