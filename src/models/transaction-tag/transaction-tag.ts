import * as _ from 'lodash';

import { ITransactionTag } from './transaction-tag.interface';

export class TransactionTag {
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITransactionTag) {
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