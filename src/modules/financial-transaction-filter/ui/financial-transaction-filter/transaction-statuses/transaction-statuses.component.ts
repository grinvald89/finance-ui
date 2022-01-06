import { Component, ChangeDetectionStrategy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionStatus } from 'src/models';

@Component({
    selector: 'transaction-statuses',
    templateUrl: './transaction-statuses.component.html',
    styleUrls: ['./transaction-statuses.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionStatusesComponent implements OnInit {
    private form: FormGroup;
    private statuses: TransactionStatus[] = [];

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedTransactionStatuses: EventEmitter<TransactionStatus[]> = new EventEmitter<TransactionStatus[]>();

    @Input('Statuses')
    set Statuses(value: TransactionStatus[]) {
        this.statuses = value;
        this.setSelectedFormValues();
    }
    get Statuses(): TransactionStatus[] {
        return this.statuses;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            statuses: new FormControl('')
        });
    }

    public compareTypes(s1: TransactionStatus, s2: TransactionStatus) {
        if (_.isUndefined(s1) || _.isUndefined(s2)) {
            return true;
        }

        return s1.Id === s2.Id;
    }

    public ngOnInit(): void {
        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionStatuses.emit(this.Form.value.statuses)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['statuses'].setValue(this.Statuses, { emitEvent: false });
    }
}
