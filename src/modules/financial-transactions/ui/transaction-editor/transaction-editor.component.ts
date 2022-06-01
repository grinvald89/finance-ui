import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Transaction } from 'src/models/transaction';
import {
    ITransactionCategory,
    ITransactionDirection,
    ITransactionStatus,
    ITransactionTag,
    ITransactionType,
    IUser,
    TransactionCategory,
    TransactionDirection,
    TransactionStatus,
    TransactionTag,
    TransactionType,
    User
} from 'src/models';
import * as moment from 'moment';

interface IFormValue {
    date: moment.Moment,
    summ: number,
    status: TransactionStatus,
    type: TransactionType,
    payer: User,
    direction: TransactionDirection,
    category: TransactionCategory,
    tags: TransactionTag[],
    comment: string,
}

@Component({
    selector: 'transaction-editor',
    templateUrl: './transaction-editor.component.html',
    styleUrls: ['./transaction-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionEditorComponent implements OnInit {
    private form!: FormGroup;
    private formDirectionValue: TransactionDirection | undefined;
    private transaction: Transaction = new Transaction();
    private statuses: TransactionStatus[] = [];
    private types: TransactionType[] = [];
    private payers: User[] = [];
    private directions: TransactionDirection[] = [];
    private categories: TransactionCategory[] = [];
    private allCategories: TransactionCategory[] = [];
    private tags: TransactionTag[] = [];

    get Form(): FormGroup {
        return this.form;
    }
    set Form(value: FormGroup) {
        this.form = value;
    }

    get Transaction(): Transaction {
        return this.transaction;
    }
    set Transaction(value: Transaction) {
        this.transaction = value;
    }

    get Statuses(): TransactionStatus[] {
        return this.statuses;
    }
    set Statuses(value: TransactionStatus[]) {
        this.statuses = value;
    }

    get Types(): TransactionType[] {
        return this.types;
    }
    set Types(value: TransactionType[]) {
        this.types = value;
    }

    get Payers(): User[] {
        return this.payers;
    }
    set Payers(value: User[]) {
        this.payers = value;
    }

    get Directions(): TransactionDirection[] {
        return this.directions;
    }
    set Directions(value: TransactionDirection[]) {
        this.directions = value;
    }

    get Categories(): TransactionCategory[] {
        return this.categories;
    }
    set Categories(value: TransactionCategory[]) {
        this.categories = value;
    }

    get Tags(): TransactionTag[] {
        return this.tags;
    }
    set Tags(value: TransactionTag[]) {
        this.tags = value;
    }

    constructor(
        private readonly formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<TransactionEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data?: Transaction,
    ) {
        if (!_.isNil(data)) {
            this.transaction = _.cloneDeep(data);
        }

        this.Form = this.formBuilder.group({
            date: new FormControl('', [Validators.required]),
            summ: new FormControl(0, [Validators.required]),
            status: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            payer: new FormControl('', [Validators.required]),
            direction: new FormControl('', [Validators.required]),
            category: new FormControl('', [Validators.required]),
            tags: new FormControl([]),
            comment: new FormControl('')
        });
    }

    public ngOnInit(): void {
        this.createForm();
    }

    public close(transaction?: Transaction): void {
        this.dialogRef.close(transaction);
    }

    public submit(): void {
        if (!this.Form.valid) {
            this.Form.markAllAsTouched();
            return;
        }

        this.close(this.Transaction);
    }

    public compareTags(t1: TransactionTag, t2: TransactionTag) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private createForm(): void {
        this.loadTransactionStatuses();
        this.loadTransactionTypes();
        this.loadPayers();
        this.loadDirections();
        this.loadCategories();
        this.loadTags();

        const status: TransactionStatus | undefined =
            _.find(this.Statuses, (item: TransactionStatus): boolean => this.Transaction.Status.Id === item.Id);

        const type: TransactionType | undefined =
            _.find(this.Types, (item: TransactionType): boolean => this.Transaction.Type.Id === item.Id);

        const payer: User | undefined =
            _.find(this.Payers, (item: User): boolean => this.Transaction.Payer.Id === item.Id);

        const direction: TransactionDirection | undefined =
            _.find(this.Directions, (item: TransactionDirection): boolean => this.Transaction.Direction.Id === item.Id);

        this.formDirectionValue = direction;
        if (!_.isNil(direction)) {
            this.Categories = _.filter(this.allCategories, (item: TransactionCategory): boolean => item.DirectionId === direction.Id);
        }

        const category: TransactionCategory | undefined =
            _.find(this.Categories, (item: TransactionCategory): boolean => this.Transaction.Category.Id === item.Id);

        const selectedTags: TransactionTag[] = [];
        _.forEach(this.Tags, (tag: TransactionTag): void => {
            const isTagSelected: boolean = _.find(this.Transaction.Tags, (transactionTag: TransactionTag): boolean => {
                return tag.Id === transactionTag.Id;
            }) !== undefined;

            if (isTagSelected) {
                selectedTags.push(tag);
            }
        });

        this.Form.controls['date'].setValue(this.Transaction.Date);
        this.Form.controls['summ'].setValue(this.Transaction.Summ);
        this.Form.controls['status'].setValue(status);
        this.Form.controls['type'].setValue(type);
        this.Form.controls['payer'].setValue(payer);
        this.Form.controls['direction'].setValue(direction);
        this.Form.controls['category'].setValue(category);
        this.Form.controls['tags'].setValue(selectedTags);
        this.Form.controls['comment'].setValue(this.Transaction.Comment);

        this.Form.valueChanges
            .subscribe((formValue: IFormValue): void => {
                const isDirectionFirstValue: boolean = _.isNil(this.formDirectionValue);
                const isDirectionChanged: boolean = (!_.isNil(formValue.direction) && this.formDirectionValue?.Id !== formValue.direction.Id);
                if (isDirectionFirstValue || isDirectionChanged) {
                    this.Categories = _.filter(this.allCategories, (item: TransactionCategory): boolean => item.DirectionId === formValue.direction.Id);
                }

                this.formDirectionValue = formValue.direction;

                if (this.Form.valid) {
                    this.saveFormValue();
                }
            });
    }

    private loadTransactionStatuses(): void {
        const lsStatuses = localStorage.getItem('transaction-statuses') || '[]';
        this.Statuses = _.map(JSON.parse(lsStatuses), (item: ITransactionStatus): TransactionStatus => new TransactionStatus(item));
    }

    private loadTransactionTypes(): void {
        const lsTypes = localStorage.getItem('transaction-types') || '[]';
        this.Types = _.map(JSON.parse(lsTypes), (item: ITransactionType): TransactionType => new TransactionType(item));
    }

    private loadPayers(): void {
        const lsPayers = localStorage.getItem('payers') || '[]';
        this.Payers = _.map(JSON.parse(lsPayers), (item: IUser): User => new User(item));
    }

    private loadDirections(): void {
        const lsDirections = localStorage.getItem('transaction-directions') || '[]';
        this.Directions = _.map(JSON.parse(lsDirections), (item: ITransactionDirection): TransactionDirection => new TransactionDirection(item));
    }

    private loadCategories(): void {
        const lsCategories = localStorage.getItem('transaction-categories') || '[]';
        this.allCategories = _.map(JSON.parse(lsCategories), (item: ITransactionCategory): TransactionCategory => new TransactionCategory(item));
    }

    private loadTags(): void {
        const lsTags = localStorage.getItem('transaction-tags') || '[]';
        this.Tags = _.map(JSON.parse(lsTags), (item: ITransactionTag): TransactionTag => new TransactionTag(item));
    }

    private saveFormValue(): void {
        const formValue: IFormValue = this.Form.value;

        this.Transaction = new Transaction({
            category: {
                directionId: formValue.category.DirectionId,
                id: formValue.category.Id,
                name: formValue.category.Name
            },
            comment: formValue.comment,
            date: moment(formValue.date).utc(true),
            direction: {
                id: formValue.direction.Id,
                name: formValue.direction.Name
            },
            id: this.Transaction.Id,
            payer: {
                creationDate: formValue.payer.CreationDate,
                fullName: {
                    firstName: formValue.payer.FullName.FirstName,
                    id: formValue.payer.FullName.Id,
                    lastName: formValue.payer.FullName.LastName,
                    middleName: formValue.payer.FullName.MiddleName
                },
                id: formValue.payer.Id
            },
            status: {
                id: formValue.status.Id,
                name: formValue.status.Name
            },
            summ: formValue.summ,
            tags: _.map(formValue.tags, (item: TransactionTag): ITransactionTag => {
                return {
                    id: item.Id,
                    name: item.Name
                }
            }),
            type: {
                id: formValue.type.Id,
                name: formValue.type.Name
            }
        });
    }
}