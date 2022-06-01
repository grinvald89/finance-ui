import * as moment from 'moment';

import { ITransactionCategory, ITransactionDirection, ITransactionStatus, ITransactionTag, ITransactionType, IUser } from '..';

export interface ITransaction {
    readonly id: string;
    readonly date: moment.Moment;
    readonly payer: IUser
    readonly status: ITransactionStatus;
    readonly type: ITransactionType;
    readonly direction: ITransactionDirection;
    readonly category: ITransactionCategory;
    readonly tags: ITransactionTag[];
    readonly comment: string;
    readonly summ: number;
}