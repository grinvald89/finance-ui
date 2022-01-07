import * as _ from 'lodash';

import { ITransactionSubCategoryFirstOption } from './transaction-subcategory-first-option.interface';

export class TransactionSubCategoryFirstOption {
    private readonly id: string = '';
    private readonly name: string = '';
    private readonly subCategoryId: string = '';

    constructor(params?: ITransactionSubCategoryFirstOption) {
        if (!_.isUndefined(params)) {
            this.subCategoryId = params.subCategoryId;
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

    get SubCategoryId(): string {
        return this.subCategoryId;
    }
}