import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

    constructor(
        private readonly facade: AuthenticationFacade,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) {
        this.form = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public ngOnInit(): void {

    }

    public login(): void {
        this.facade.login(this.Form.value.userName, this.Form.value.password)
            .subscribe({
                next: (accessToken: string): void => {
                    localStorage.setItem('accessToken', accessToken);
                    this.router.navigate(['/financial-transactions']);
                },
                error: err => console.error(err.error)
            });
    }
}
