import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionType } from 'src/models';

@Component({
    selector: 'transaction-types',
    templateUrl: './transaction-types.component.html',
    styleUrls: [
        './transaction-types.component.scss',
        '../styles/fields.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionTypesComponent {
    private form!: FormGroup;
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
        this.createForm();
    }

    public compareTypes(t1: TransactionType, t2: TransactionType) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            types: new FormControl('')
        });

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
