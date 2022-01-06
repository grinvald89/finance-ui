import * as _ from 'lodash';

import { IUserRole } from './user-role.interface';

export class UserRole {
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: IUserRole) {
        if (!_.isUndefined(params)) {
            this.id = params.id;
            this.name = params.name;
        }
    }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }
}