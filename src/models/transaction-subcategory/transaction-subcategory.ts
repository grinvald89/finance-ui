import * as _ from 'lodash';

import { ITransactionSubCategory } from './transaction-subcategory.interface';

export class TransactionSubCategory {
    private readonly categoryId: string = '';
    private readonly categoryOptionId: string = '';
    private readonly id: string = '';
    private readonly name: string = '';

    constructor(params?: ITransactionSubCategory) {
        if (!_.isUndefined(params)) {
            this.categoryId = params.categoryId;
            this.categoryOptionId = params.categoryOptionId;
            this.id = params.id;
            this.name = params.name;
        }
    }

    get CategoryId(): string {
        return this.categoryId;
    }

    get CategoryOptionId(): string {
        return this.categoryOptionId;
    }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }
}