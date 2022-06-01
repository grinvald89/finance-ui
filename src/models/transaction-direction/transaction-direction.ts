import * as _ from 'lodash';

import { ITransactionDirection } from './transaction-direction.interface';

export class TransactionDirection {
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITransactionDirection) {
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