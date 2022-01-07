import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionSubCategorySecondOption } from 'src/models';

@Component({
    selector: 'transaction-subcategory-second-options',
    templateUrl: './transaction-subcategory-second-options.component.html',
    styleUrls: ['./transaction-subcategory-second-options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionSubcategorySecondOptionsComponent {
    private form!: FormGroup;
    private subCategorySecondOptions: TransactionSubCategorySecondOption[] = [];

    get Form(): FormGroup {
        return this.form;
    }
    set Form(value: FormGroup) {
        this.form = value;
    }

    @Output()
    private ChangeSelectedTransactionSubCategorySecondOptions: EventEmitter<TransactionSubCategorySecondOption[]> =
        new EventEmitter<TransactionSubCategorySecondOption[]>();

    @Input('SubCategorySecondOptions')
    set SubCategorySecondOptions(value: TransactionSubCategorySecondOption[]) {
        this.subCategorySecondOptions = value;
        this.setSelectedFormValues();
    }
    get SubCategorySecondOptions(): TransactionSubCategorySecondOption[] {
        return this.subCategorySecondOptions;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.updateForm();
    }

    public compareSubCategorySecondOptions(t1: TransactionSubCategorySecondOption, t2: TransactionSubCategorySecondOption) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private updateForm(): void {
        this.Form = this.formBuilder.group({
            subCategorySecondOptions: new FormControl('')
        });

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionSubCategorySecondOptions.emit(this.Form.value.subCategorySecondOptions)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['subCategorySecondOptions'].setValue(this.SubCategorySecondOptions);
    }
}
