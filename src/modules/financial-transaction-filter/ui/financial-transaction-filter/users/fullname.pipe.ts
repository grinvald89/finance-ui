import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

import { UserFullName } from 'src/models';

@Pipe({
    name: 'fullname'
})
export class FullnamePipe implements PipeTransform {
    transform(value: UserFullName, args?: any): string {
        let result: string = '';

        if (_.isNil(value)) {
            return result;
        }

        if (!_.isEmpty(value.FirstName)) {
            result = value.FirstName;
        }

        if (!_.isEmpty(value.LastName)) {
            result = `${result} ${value.LastName[0]}.`;
        }

        if (!_.isEmpty(value.MiddleName)) {
            result = `${result} ${value.MiddleName[0]}.`;
        }

        return result;
    }
}