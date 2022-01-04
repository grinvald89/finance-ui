import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationFacade } from '../../core';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    private form: FormGroup;
    private hidePassword: boolean = true;
    private loading: boolean = false;

    get Form(): FormGroup {
        return this.form;
    }

    get HidePassword(): boolean {
        return this.hidePassword;
    }
    set HidePassword(value: boolean) {
        this.hidePassword = value;
    }

    get Loading(): boolean {
        return this.loading;
    }
    set Loading(value: boolean) {
        this.loading = value;
    }

    constructor(private readonly facade: AuthenticationFacade, public fb: FormBuilder) {
        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
          });
    }

    public ngOnInit(): void {

    }

    public login(): void {
        this.facade.login(this.Form.value.userName, this.Form.value.password)
            .subscribe({
                next: res => {
                    console.log(res);
                },
                error: err => console.error(err.error)
            });
    }
}
