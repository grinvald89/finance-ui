import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private readonly router: Router) { }

    canActivate(): boolean {
        const accessToken = localStorage.getItem('accessToken');
        const isAuthorized: boolean = !_.isEmpty(accessToken);

        if (!isAuthorized) {
            this.router.navigate(['/login']);
        }

        return !_.isEmpty(accessToken);
    }
}