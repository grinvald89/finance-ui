import * as _ from 'lodash';

import { ITransactionCategory } from './transaction-category.interface';

export class TransactionCategory {
    private readonly directionId: string = '';
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITransactionCategory) {
        if (!_.isUndefined(params)) {
            this.directionId = params.directionId;
            this.id = params.id;
            this.name = params.name;
        }
    }

    get DirectionId(): string {
        return this.directionId;
    }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }
}