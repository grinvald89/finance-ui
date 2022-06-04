import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionTag } from 'src/models';

@Component({
    selector: 'transaction-tags',
    templateUrl: './transaction-tags.component.html',
    styleUrls: [
        './transaction-tags.component.scss',
        '../styles/fields.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionTagsComponent {
    private form!: FormGroup;
    private tags: TransactionTag[] = [];

    get Form(): FormGroup {
        return this.form;
    }
    set Form(value: FormGroup) {
        this.form = value;
    }

    @Output()
    private ChangeSelectedTransactionTags: EventEmitter<TransactionTag[]> = new EventEmitter<TransactionTag[]>();

    @Input('Tags')
    set Tags(value: TransactionTag[]) {
        this.tags = value;
        this.setSelectedFormValues();
    }
    get Tags(): TransactionTag[] {
        return this.tags;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.createForm();
    }

    public compareTags(t1: TransactionTag, t2: TransactionTag) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private createForm(): void {
        this.Form = this.formBuilder.group({
            tags: new FormControl('')
        });

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionTags.emit(this.Form.value.tags)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['tags'].setValue([]);
    }
}
