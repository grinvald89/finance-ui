import * as _ from 'lodash';

import { ITypeTransaction } from './type-transaction.interface';

export class TypeTransaction {
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITypeTransaction) {
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