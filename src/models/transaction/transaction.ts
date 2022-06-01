import * as moment from 'moment';
import * as _ from 'lodash';

import { ITransaction } from './transaction.interface';
import { ITransactionTag, TransactionCategory, TransactionDirection, TransactionStatus, TransactionTag, TransactionType, User } from '..';

export class Transaction {
    private readonly id: string = '';
    private readonly date: moment.Moment = moment();
    private readonly payer: User = new User();
    private readonly status: TransactionStatus = new TransactionStatus();
    private readonly type: TransactionType = new TransactionType();
    private readonly direction: TransactionDirection = new TransactionDirection();
    private readonly category: TransactionCategory = new TransactionCategory();
    private readonly tags: TransactionTag[] = [];
    private readonly comment: string = '';
    private readonly summ: number = 0;

    constructor(params?: ITransaction) {
        if (!_.isUndefined(params)) {
            this.id = params.id;
            this.date = params.date;
            this.payer = new User(params.payer);
            this.status = new TransactionStatus(params.status);
            this.type = new TransactionType(params.type);
            this.direction = new TransactionDirection(params.direction);
            this.category = new TransactionCategory(params.category);
            this.tags = _.map(params.tags, (item: ITransactionTag): TransactionTag => new TransactionTag(item));
            this.comment = params.comment;
            this.summ = params.summ;
        }
    }

    get Id(): string {
        return this.id;
    }

    get Date(): moment.Moment {
        return this.date;
    }

    get Payer(): User {
        return this.payer;
    }

    get Status(): TransactionStatus {
        return this.status;
    }

    get Type(): TransactionType {
        return this.type;
    }

    get Direction(): TransactionDirection {
        return this.direction;
    }

    get Category(): TransactionCategory {
        return this.category;
    }

    get Tags(): TransactionTag[] {
        return this.tags;
    }

    get Comment(): string {
        return this.comment;
    }

    get Summ(): number {
        return this.summ;
    }
}
