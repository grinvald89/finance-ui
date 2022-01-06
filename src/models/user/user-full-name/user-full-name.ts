import * as _ from 'lodash';

import { IUserFullName } from './user-full-name.interface';

export class UserFullName {
    private readonly id: string = '';
    private readonly lastName: string = '';
    private readonly firstName: string = '';
    private readonly middleName: string = '';

    constructor(params?: IUserFullName) {
        if (!_.isUndefined(params)) {
            this.id = params.id;
            this.lastName = params.lastName;
            this.firstName = params.firstName;
            this.middleName = params.middleName;
        }
    }

    get Id(): string {
        return this.id;
    }

    get LastName(): string {
        return this.lastName;
    }

    get FirstName(): string {
        return this.firstName;
    }

    get MiddleName(): string {
        return this.middleName;
    }
}