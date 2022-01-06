import * as _ from 'lodash';

import { ITransactionCategoryOption } from './transaction-category-option.interface';

export class TransactionCategoryOption {
    private readonly categoryId: string = '';
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITransactionCategoryOption) {
        if (!_.isUndefined(params)) {
            this.categoryId = params.categoryId;
            this.id = params.id;
            this.name = params.name;
        }
    }

    get CategoryId(): string {
        return this.categoryId;
    }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }
}