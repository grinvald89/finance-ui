import * as moment from 'moment';

export interface IUserAuthorization {
    readonly id: string;
    readonly userName: string;
    readonly password: string;
    readonly tokenUpdateDate: moment.Moment;
    readonly accessToken: string;
    readonly isBlocked: boolean;
}