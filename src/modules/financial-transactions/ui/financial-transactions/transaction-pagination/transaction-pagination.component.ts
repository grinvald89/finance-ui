import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

const PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 50, 100];

@Component({
    selector: 'transaction-pagination',
    templateUrl: './transaction-pagination.component.html',
    styleUrls: ['./transaction-pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TransactionPaginationComponent {
    @Input('length')
    public length: number = 0;

    @Input('pageIndex')
    public pageIndex: number = 0;

    @Input('pageSize')
    public pageSize: number = 0;

    public pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;

    @Output()
    private pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    public emitPageEvent(event: PageEvent) {
        this.pageEvent.emit(event);
    }
}