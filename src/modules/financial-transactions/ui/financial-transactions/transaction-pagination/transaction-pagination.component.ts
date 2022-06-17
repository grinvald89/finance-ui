import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
    @Input('pagination')
    public pagination!: IPagination;

    @Output()
    private pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    public emitPageEvent(event: PageEvent) {
        this.pageEvent.emit(event);
    }
}