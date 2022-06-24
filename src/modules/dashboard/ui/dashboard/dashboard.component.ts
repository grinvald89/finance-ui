import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ITransactionFilter, ITransactionTotalAmount } from 'src/models';
import { DashboardFacade } from '../../core';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    private transactionFilter!: ITransactionFilter;
    private isShowFilter: boolean = false;
    private totalAmountLoaded: boolean = false;
    private totalAmount: ITransactionTotalAmount = {
        balance: 0,
        expense: 0,
        refill: 0
    };

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly dashboardFacade: DashboardFacade
    ) { }

    get TransactionFilter(): ITransactionFilter {
        return this.transactionFilter;
    }
    set TransactionFilter(value: ITransactionFilter) {
        this.transactionFilter = value;
    }

    get IsShowFilter(): boolean {
        return this.isShowFilter;
    }
    set IsShowFilter(value: boolean) {
        this.isShowFilter = value;        
    }

    get TotalAmount(): ITransactionTotalAmount {
        return this.totalAmount;
    }

    get TotalAmountLoaded(): boolean {
        return this.totalAmountLoaded;
    }

    public onUpdatedTransactionFilter(filter: ITransactionFilter): void {
        this.TransactionFilter = filter;
        this.totalAmountLoaded = false;
        this.dashboardFacade.getTransactionTotalAmount(filter)
            .subscribe((totalAmount: ITransactionTotalAmount) => {
                this.totalAmount = totalAmount;
                this.totalAmountLoaded = true;
                this.changeDetector.detectChanges();
            });
    }
}
