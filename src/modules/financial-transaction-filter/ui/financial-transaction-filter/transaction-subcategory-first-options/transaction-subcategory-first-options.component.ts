import { Component, ChangeDetectionStrategy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionSubCategoryFirstOption } from 'src/models';

@Component({
    selector: 'transaction-subcategory-first-options',
    templateUrl: './transaction-subcategory-first-options.component.html',
    styleUrls: ['./transaction-subcategory-first-options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionSubcategoryFirstOptionsComponent implements OnInit {
    private form: FormGroup;
    private subCategoryFirstOptions: TransactionSubCategoryFirstOption[] = [];

    get Form(): FormGroup {
        return this.form;
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
        this.form = this.formBuilder.group({
            subCategoryFirstOptions: new FormControl('')
        });
    }

    public compareSubCategoryFirstOptions(t1: TransactionSubCategoryFirstOption, t2: TransactionSubCategoryFirstOption) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    public ngOnInit(): void {
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
