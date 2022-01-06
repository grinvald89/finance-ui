import { Component, ChangeDetectionStrategy, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Period } from '../../../core';

interface IFormValue {
    startDate: moment.Moment;
    endDate: moment.Moment;
}

@Component({
    selector: 'dates',
    templateUrl: './dates.component.html',
    styleUrls: ['./dates.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatesComponent implements OnInit {
    private form: FormGroup;

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedPeriod: EventEmitter<Period> = new EventEmitter<Period>();

    constructor(private readonly formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            startDate: new FormControl(),
            endDate: new FormControl()
        });
    }

    public ngOnInit(): void {
        this.Form.valueChanges
            .subscribe((formValue: IFormValue): void => {
                if (this.Form.valid && !_.isNil(formValue.startDate) && !_.isNil(formValue.endDate)) {
                    this.ChangeSelectedPeriod.emit(
                        new Period(formValue.startDate, formValue.endDate)
                    );
                }
            });
    }
}
