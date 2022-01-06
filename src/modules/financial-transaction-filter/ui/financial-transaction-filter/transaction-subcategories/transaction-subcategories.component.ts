import { Component, ChangeDetectionStrategy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionSubCategory } from 'src/models';

@Component({
    selector: 'transaction-subcategories',
    templateUrl: './transaction-subcategories.component.html',
    styleUrls: ['./transaction-subcategories.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionSubcategoriesComponent implements OnInit {
    private form: FormGroup;
    private subCategories: TransactionSubCategory[] = [];

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedTransactionSubCategories: EventEmitter<TransactionSubCategory[]> = new EventEmitter<TransactionSubCategory[]>();

    @Input('SubCategories')
    set SubCategories(value: TransactionSubCategory[]) {
        this.subCategories = value;
        this.setSelectedFormValues();
    }
    get SubCategories(): TransactionSubCategory[] {
        return this.subCategories;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            subCategories: new FormControl('')
        });
    }

    public compareSubCategories(t1: TransactionSubCategory, t2: TransactionSubCategory) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    public ngOnInit(): void {
        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionSubCategories.emit(this.Form.value.subCategories)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['subCategories'].setValue(this.SubCategories, { emitEvent: false });
    }
}