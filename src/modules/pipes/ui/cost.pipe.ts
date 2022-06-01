import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'cost'
})
export class CostPipe implements PipeTransform {
    transform(value: number, args?: any): string {
        if (_.isNil(value)) {
            return '0 р.';
        }

        const costTest = value.toString().split(' ');

        return `${(Number(costTest)).toLocaleString()} р.`;
    }
}