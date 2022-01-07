import { Component, ChangeDetectionStrategy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { User } from 'src/models';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
    private form: FormGroup;
    private users: User[] = [];

    get Form(): FormGroup {
        return this.form;
    }

    @Output()
    private ChangeSelectedUsers: EventEmitter<User[]> = new EventEmitter<User[]>();

    @Input('Users')
    set Users(value: User[]) {
        this.users = value;
        this.setSelectedFormValues();
    }
    get Users(): User[] {
        return this.users;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            users: new FormControl('')
        });
    }

    public compareUsers(u1: User, u2: User) {
        if (_.isUndefined(u1) || _.isUndefined(u2)) {
            return true;
        }

        return u1.Id === u2.Id;
    }

    public ngOnInit(): void {
        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedUsers.emit(this.Form.value.users)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['users'].setValue(this.Users);
    }
}
