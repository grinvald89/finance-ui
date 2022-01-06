import * as _ from 'lodash';

import { ITransactionStatus } from './transaction-status.interface';

export class TransactionStatus {
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITransactionStatus) {
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