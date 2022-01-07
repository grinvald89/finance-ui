import { Component, ChangeDetectionStrategy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionCategory } from 'src/models';

@Component({
    selector: 'transaction-categories',
    templateUrl: './transaction-categories.component.html',
    styleUrls: ['./transaction-categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionCategoriesComponent {
    private form: FormGroup;
    private categories: TransactionCategory[] = [];

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedTransactionCategories: EventEmitter<TransactionCategory[]> = new EventEmitter<TransactionCategory[]>();

    @Input('Categories')
    set Categories(value: TransactionCategory[]) {
        this.categories = value;
        this.setSelectedFormValues();
    }
    get Categories(): TransactionCategory[] {
        return this.categories;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            categories: new FormControl('')
        });

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionCategories.emit(this.Form.value.categories)
                }
            });
    }

    public compareCategories(t1: TransactionCategory, t2: TransactionCategory) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private setSelectedFormValues(): void {
        this.Form.controls['categories'].setValue(this.Categories);
    }
}
