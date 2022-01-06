import * as moment from 'moment';
import * as _ from 'lodash';

import { UserFullName } from './user-full-name';
import { IUserRole, UserRole } from './user-role';
import { UserAuthorization } from './user-authorization';
import { IUser } from './user.interface';

export class User {
    private readonly authorization: UserAuthorization = new UserAuthorization();
    private readonly creationDate: moment.Moment = moment();
    private readonly fullName: UserFullName = new UserFullName();
    private readonly id: string = '';
    private readonly roles: UserRole[] = [];

    constructor(params?: IUser) {
        if (!_.isUndefined(params)) {
            this.authorization = new UserAuthorization(params.authorization);
            this.creationDate = params.creationDate;
            this.fullName = new UserFullName(params.fullName);
            this.id = params.id;
            this.roles = _.map(params.roles, (item: IUserRole): UserRole => new UserRole(item));
        }
    }

    get Authorization(): UserAuthorization {
        return this.authorization;
    }

    get CreationDate(): moment.Moment {
        return this.creationDate;
    }

    get FullName(): UserFullName {
        return this.fullName;
    }

    get Id(): string {
        return this.id;
    }

    get Roles(): UserRole[] {
        return this.roles;
    }
}