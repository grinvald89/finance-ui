import { Component, ChangeDetectionStrategy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionType } from 'src/models';

@Component({
    selector: 'transaction-types',
    templateUrl: './transaction-types.component.html',
    styleUrls: ['./transaction-types.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionTypesComponent implements OnInit {
    private form: FormGroup;
    private types: TransactionType[] = [];

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedTransactionTypes: EventEmitter<TransactionType[]> = new EventEmitter<TransactionType[]>();

    @Input('Types')
    set Types(value: TransactionType[]) {
        this.types = value;
        this.setSelectedFormValues();
    }
    get Types(): TransactionType[] {
        return this.types;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            types: new FormControl('')
        });
    }

    public compareTypes(t1: TransactionType, t2: TransactionType) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    public ngOnInit(): void {
        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionTypes.emit(this.Form.value.types)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['types'].setValue(this.Types);
    }
}
