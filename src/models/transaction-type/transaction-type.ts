import * as _ from 'lodash';

import { ITransactionType } from './transaction-type.interface';

export class TransactionType {
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITransactionType) {
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