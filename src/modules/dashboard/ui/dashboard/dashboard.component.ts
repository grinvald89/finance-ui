import { Component, ChangeDetectionStrategy, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';

import { ITransactionFilter } from 'src/models';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    private transactionFilter!: ITransactionFilter;
    private isShowFilter: boolean = false;

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

    public onUpdatedTransactionFilter(filter: ITransactionFilter): void {
        this.TransactionFilter = filter;
    }
}
