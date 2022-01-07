import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionSubCategoryFirstOption } from 'src/models';

@Component({
    selector: 'transaction-subcategory-first-options',
    templateUrl: './transaction-subcategory-first-options.component.html',
    styleUrls: ['./transaction-subcategory-first-options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionSubcategoryFirstOptionsComponent {
    private form!: FormGroup;
    private subCategoryFirstOptions: TransactionSubCategoryFirstOption[] = [];

    get Form(): FormGroup {
        return this.form;
    }
    set Form(value: FormGroup) {
        this.form = value;
    }

    @Output()
    private ChangeSelectedTransactionSubCategoryFirstOptions: EventEmitter<TransactionSubCategoryFirstOption[]> =
        new EventEmitter<TransactionSubCategoryFirstOption[]>();

    @Input('SubCategoryFirstOptions')
    set SubCategoryFirstOptions(value: TransactionSubCategoryFirstOption[]) {
        this.subCategoryFirstOptions = value;
        this.setSelectedFormValues();
    }
    get SubCategoryFirstOptions(): TransactionSubCategoryFirstOption[] {
        return this.subCategoryFirstOptions;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.updateForm();
    }

    public compareSubCategoryFirstOptions(t1: TransactionSubCategoryFirstOption, t2: TransactionSubCategoryFirstOption) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private updateForm(): void {
        this.Form = this.formBuilder.group({
            subCategoryFirstOptions: new FormControl('')
        });

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionSubCategoryFirstOptions.emit(this.Form.value.subCategoryFirstOptions)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['subCategoryFirstOptions'].setValue(this.SubCategoryFirstOptions);
    }
}
