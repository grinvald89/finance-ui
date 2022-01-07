import * as _ from 'lodash';

import { ITransactionSubCategorySecondOption } from './transaction-subcategory-second-option.interface';

export class TransactionSubCategorySecondOption {
    private readonly id: string = '';
    private readonly name: string = '';
    private readonly subCategoryId: string = '';
    private readonly subCategoryFirstOptionId: string = '';

    constructor(params?: ITransactionSubCategorySecondOption) {
        if (!_.isUndefined(params)) {
            this.id = params.id;
            this.name = params.name;
            this.subCategoryId = params.subCategoryId;
            this.subCategoryFirstOptionId = params.subCategoryFirstOptionId;
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

    get SubCategoryFirstOptionId(): string {
        return this.subCategoryFirstOptionId;
    }
}