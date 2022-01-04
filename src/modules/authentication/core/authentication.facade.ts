import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationRepository } from '../data/authentication.repository';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationFacade {
    constructor(private readonly authenticationRepository: AuthenticationRepository) { }

    public login(username: string, password: string): Observable<string> {
        return this.authenticationRepository.login(username, password);
    }
}