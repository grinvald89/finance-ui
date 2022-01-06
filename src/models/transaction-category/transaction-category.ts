import * as _ from 'lodash';

import { ITransactionCategory } from './transaction-category.interface';

export class TransactionCategory {
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITransactionCategory) {
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