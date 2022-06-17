import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { IPagination } from '../pagination.interface';

@Component({
    selector: 'transaction-pagination',
    templateUrl: './transaction-pagination.component.html',
    styleUrls: ['./transaction-pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TransactionPaginationComponent {
    private pagination!: IPagination;

    @Input('pagination')
    set Pagination(value: IPagination) {
        this.pagination = value;
        this.changeDetector.reattach();
    }
    get Pagination(): IPagination {
        return this.pagination;
    }

    @Output()
    private pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    constructor(private changeDetector: ChangeDetectorRef) { }

    public emitPageEvent(event: PageEvent) {
        this.pageEvent.emit(event);
    }
}