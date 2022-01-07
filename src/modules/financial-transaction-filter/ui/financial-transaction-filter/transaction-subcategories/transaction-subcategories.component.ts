import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionSubCategory } from 'src/models';

@Component({
    selector: 'transaction-subcategories',
    templateUrl: './transaction-subcategories.component.html',
    styleUrls: ['./transaction-subcategories.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionSubcategoriesComponent {
    private form!: FormGroup;
    private subCategories: TransactionSubCategory[] = [];

    get Form(): FormGroup {
        return this.form;
    }
    set Form(value: FormGroup) {
        this.form = value;
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
        this.updateForm();

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionSubCategories.emit(this.Form.value.subCategories)
                }
            });
    }

    public compareSubCategories(t1: TransactionSubCategory, t2: TransactionSubCategory) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private updateForm(): void {
        this.Form = this.formBuilder.group({
            subCategories: new FormControl('')
        });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['subCategories'].setValue(this.SubCategories);
    }
}
