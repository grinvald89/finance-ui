import { Component, ChangeDetectionStrategy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionSubCategorySecondOption } from 'src/models';

@Component({
    selector: 'transaction-subcategory-second-options',
    templateUrl: './transaction-subcategory-second-options.component.html',
    styleUrls: ['./transaction-subcategory-second-options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionSubcategorySecondOptionsComponent implements OnInit {
    private form: FormGroup;
    private subCategorySecondOptions: TransactionSubCategorySecondOption[] = [];

    get Form(): FormGroup {
        return this.form;
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
        this.form = this.formBuilder.group({
            subCategorySecondOptions: new FormControl('')
        });
    }

    public compareSubCategorySecondOptions(t1: TransactionSubCategorySecondOption, t2: TransactionSubCategorySecondOption) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    public ngOnInit(): void {
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
