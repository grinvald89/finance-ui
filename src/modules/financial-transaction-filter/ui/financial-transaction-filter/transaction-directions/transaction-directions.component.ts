import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionDirection } from 'src/models';

@Component({
    selector: 'transaction-directions',
    templateUrl: './transaction-directions.component.html',
    styleUrls: [
        './transaction-directions.component.scss',
        '../styles/fields.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionDirectionsComponent {
    private form!: FormGroup;
    private directions: TransactionDirection[] = [];

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedTransactionDirections: EventEmitter<TransactionDirection[]> = new EventEmitter<TransactionDirection[]>();

    @Input('Directions')
    set Directions(value: TransactionDirection[]) {
        this.directions = value;
        this.setSelectedFormValues();
    }
    get Directions(): TransactionDirection[] {
        return this.directions;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.createForm();
    }

    public compareDirections(t1: TransactionDirection, t2: TransactionDirection) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            directions: new FormControl('')
        });

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionDirections.emit(this.Form.value.directions)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['directions'].setValue(this.Directions);
    }
}
