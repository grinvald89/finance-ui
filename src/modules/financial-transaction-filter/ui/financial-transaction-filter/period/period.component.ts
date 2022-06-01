import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';

import { IPeriod } from 'src/models';

interface IFormValue {
    startDate?: moment.Moment;
    endDate?: moment.Moment;
}

@Component({
    selector: 'period',
    templateUrl: './period.component.html',
    styleUrls: [
        './period.component.scss',
        '../styles/fields.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodComponent {
    private form!: FormGroup;

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedPeriod: EventEmitter<IPeriod> = new EventEmitter<IPeriod>();

    constructor(private readonly formBuilder: FormBuilder) {
        this.createForm();
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            startDate: new FormControl(),
            endDate: new FormControl()
        });

        this.Form.valueChanges
            .subscribe((formValue: IFormValue): void => {
                if (
                    this.Form.valid &&
                    !_.isNil(formValue.startDate) &&
                    !_.isNil(formValue.endDate) &&
                    moment(formValue.startDate).isBefore(moment(formValue.endDate))
                ) {
                    this.ChangeSelectedPeriod.emit(
                        {
                            startDate: moment(formValue.startDate).utc(true),
                            endDate: moment(formValue.endDate).utc(true)
                        }
                    );
                }
            });
    }
}
