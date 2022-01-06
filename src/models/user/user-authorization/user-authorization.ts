import * as moment from 'moment';
import * as _ from 'lodash';

import { IUserAuthorization } from './user-authorization.interface';

export class UserAuthorization {
    private readonly id: string = '';
    private readonly userName: string = '';
    private readonly password: string = '';
    private readonly tokenUpdateDate: moment.Moment = moment();
    private readonly accessToken: string = '';
    private readonly isBlocked: boolean = false;

    constructor(params?: IUserAuthorization) {
        if (!_.isUndefined(params)) {
            this.id = params.id;
            this.userName = params.userName;
            this.password = params.password;
            this.tokenUpdateDate = params.tokenUpdateDate;
            this.accessToken = params.accessToken;
            this.isBlocked = params.isBlocked;
        }
    }

    get Id(): string {
        return this.id;
    }

    get UserName(): string {
        return this.userName;
    }

    get Password(): string {
        return this.password;
    }

    get TokenUpdateDate(): moment.Moment {
        return this.tokenUpdateDate;
    }

    get AccessToken(): string {
        return this.accessToken;
    }

    get IsBlocked(): boolean {
        return this.isBlocked;
    }
}