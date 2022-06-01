import * as moment from 'moment';

import { IUserFullName } from './user-full-name';
import { IUserRole } from './user-role';
import { IUserAuthorization } from './user-authorization';

export interface IUser {
    readonly authorization?: IUserAuthorization;
    readonly creationDate: moment.Moment;
    readonly fullName: IUserFullName;
    readonly id: string;
    readonly roles?: IUserRole[];
}