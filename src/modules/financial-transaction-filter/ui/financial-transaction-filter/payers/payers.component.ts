import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { User } from 'src/models';

@Component({
    selector: 'payers',
    templateUrl: './payers.component.html',
    styleUrls: [
        './payers.component.scss',
        '../styles/fields.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayersComponent {
    private form!: FormGroup;
    private payers: User[] = [];

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedPayers: EventEmitter<User[]> = new EventEmitter<User[]>();

    @Input('Payers')
    set Payers(value: User[]) {
        this.payers = value;
        this.setSelectedFormValues();
    }
    get Payers(): User[] {
        return this.payers;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.createForm();
    }

    public comparePayers(u1: User, u2: User) {
        if (_.isUndefined(u1) || _.isUndefined(u2)) {
            return true;
        }

        return u1.Id === u2.Id;
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            payers: new FormControl('')
        });

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedPayers.emit(this.Form.value.payers)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['payers'].setValue(this.Payers);
    }
}
