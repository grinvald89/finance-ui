import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionCategoryOption } from 'src/models';

@Component({
    selector: 'transaction-category-options',
    templateUrl: './transaction-category-options.component.html',
    styleUrls: ['./transaction-category-options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionCategoryOptionsComponent {
    private form!: FormGroup;
    private categoryOptions: TransactionCategoryOption[] = [];

    get Form(): FormGroup {
        return this.form;
    }
    set Form(value: FormGroup) {
        this.form = value;
    }

    @Output()
    private ChangeSelectedTransactionCategoryOptions: EventEmitter<TransactionCategoryOption[]> = new EventEmitter<TransactionCategoryOption[]>();

    @Input('CategoryOptions')
    set CategoryOptions(value: TransactionCategoryOption[]) {
        this.categoryOptions = value;
        this.updateForm();
        this.setSelectedFormValues();
    }
    get CategoryOptions(): TransactionCategoryOption[] {
        return this.categoryOptions;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.updateForm();
    }

    public compareCategoryOptions(t1: TransactionCategoryOption, t2: TransactionCategoryOption) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private updateForm(): void {
        this.Form = this.formBuilder.group({
            categoryOptions: new FormControl('')
        });

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionCategoryOptions.emit(this.Form.value.categoryOptions)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['categoryOptions'].setValue(this.CategoryOptions);
    }
}
