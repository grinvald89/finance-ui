import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';

import { TransactionCategory, TransactionCategoryOption, TransactionStatus, TransactionSubCategory, TransactionSubCategoryFirstOption, TransactionSubCategorySecondOption, TransactionType, User } from 'src/models';
import { FinancialTransactionFilterFacade, Period } from '../../core';

@Component({
    selector: 'financial-transaction-filter',
    templateUrl: './financial-transaction-filter.component.html',
    styleUrls: ['./financial-transaction-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialTransactionFilterComponent implements OnInit {
    private transactionCategories: TransactionCategory[] = [];
    private transactionCategoryOptions: TransactionCategoryOption[] = [];
    private transactionStatuses: TransactionStatus[] = [];
    private transactionSubCategories: TransactionSubCategory[] = [];
    private transactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[] = [];
    private transactionSubCategorySecondOptions: TransactionSubCategorySecondOption[] = [];
    private transactionTypes: TransactionType[] = [];
    private users: User[] = [];

    get TransactionCategories(): TransactionCategory[] {
        return this.transactionCategories;
    }
    set TransactionCategories(value: TransactionCategory[]) {
        this.transactionCategories = value;
        this.changeDetector.detectChanges();
    }

    get TransactionCategoryOptions(): TransactionCategoryOption[] {
        return this.transactionCategoryOptions;
    }
    set TransactionCategoryOptions(value: TransactionCategoryOption[]) {
        this.transactionCategoryOptions = value;
        this.changeDetector.detectChanges();
    }

    get TransactionStatuses(): TransactionStatus[] {
        return this.transactionStatuses;
    }
    set TransactionStatuses(value: TransactionStatus[]) {
        this.transactionStatuses = value;
        this.changeDetector.detectChanges();
    }

    get TransactionSubCategories(): TransactionSubCategory[] {
        return this.transactionSubCategories;
    }
    set TransactionSubCategories(value: TransactionSubCategory[]) {
        this.transactionSubCategories = value;
        this.changeDetector.detectChanges();
    }

    get TransactionSubCategoryFirstOptions(): TransactionSubCategoryFirstOption[] {
        return this.transactionSubCategoryFirstOptions;
    }
    set TransactionSubCategoryFirstOptions(value: TransactionSubCategoryFirstOption[]) {
        this.transactionSubCategoryFirstOptions = value;
        this.changeDetector.detectChanges();
    }

    get TransactionSubCategorySecondOptions(): TransactionSubCategorySecondOption[] {
        return this.transactionSubCategorySecondOptions;
    }
    set TransactionSubCategorySecondOptions(value: TransactionSubCategorySecondOption[]) {
        this.transactionSubCategorySecondOptions = value;
        this.changeDetector.detectChanges();
    }

    get TransactionTypes(): TransactionType[] {
        return this.transactionTypes;
    }
    set TransactionTypes(value: TransactionType[]) {
        this.transactionTypes = value;
        this.changeDetector.detectChanges();
    }

    get Users(): User[] {
        return this.users;
    }
    set Users(value: User[]) {
        this.users = value;
        this.changeDetector.detectChanges();
    }

    constructor(
        private readonly facade: FinancialTransactionFilterFacade,
        private readonly changeDetector: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.facade.getTransactionCategories()
            .subscribe((transactionCategories: TransactionCategory[]): TransactionCategory[] =>
                this.TransactionCategories = transactionCategories);

        this.facade.getTransactionCategoryOptions()
            .subscribe((transactionCategoryOptions: TransactionCategoryOption[]): TransactionCategoryOption[] =>
                this.TransactionCategoryOptions = transactionCategoryOptions);

        this.facade.getTransactionStatuses()
            .subscribe((transactionStatuses: TransactionStatus[]): TransactionStatus[] =>
                this.TransactionStatuses = transactionStatuses);

        this.facade.getTransactionSubCategories()
            .subscribe((transactionSubCategories: TransactionSubCategory[]): TransactionSubCategory[] =>
                this.TransactionSubCategories = transactionSubCategories);

        this.facade.getTransactionSubCategoryFirstOptions()
            .subscribe((transactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[]): TransactionSubCategoryFirstOption[] =>
                this.TransactionSubCategoryFirstOptions = transactionSubCategoryFirstOptions);

        this.facade.getTransactionSubCategorySecondOptions()
            .subscribe((transactionSubCategorySecondOptions: TransactionSubCategorySecondOption[]): TransactionSubCategorySecondOption[] =>
                this.TransactionSubCategorySecondOptions = transactionSubCategorySecondOptions);

        this.facade.getTransactionTypes()
            .subscribe((transactionTypes: TransactionType[]): TransactionType[] =>
                this.TransactionTypes = transactionTypes);

        this.facade.getUsers()
            .subscribe((users: User[]): User[] =>
                this.Users = users);
    }

    public onChangedSelectedTransactionCategories(selectedTransactionCategories: TransactionCategory[]): void {
        console.log(selectedTransactionCategories);
    }

    public onChangedSelectedTransactionCategoryOptions(selectedTransactionCategoryOptions: TransactionCategoryOption[]): void {
        console.log(selectedTransactionCategoryOptions);
    }

    public onChangedSelectedTransactionStatuses(selectedTransactionStatuses: TransactionStatus[]): void {
        console.log(selectedTransactionStatuses);
    }

    public onChangedSelectedTransactionSubCategories(selectedTransactionSubCategories: TransactionSubCategory[]): void {
        console.log(selectedTransactionSubCategories);
    }

    public onChangedSelectedTransactionSubCategoryFirstOptions(selectedTransactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[]): void {
        console.log(selectedTransactionSubCategoryFirstOptions);
    }

    public onChangedSelectedTransactionSubCategorySecondOptions(selectedTransactionSubCategorySecondOptions: TransactionSubCategorySecondOption[]): void {
        console.log(selectedTransactionSubCategorySecondOptions);
    }

    public onChangedSelectedTransactionTypes(selectedTransactionTypes: TransactionType[]): void {
        console.log(selectedTransactionTypes);
    }

    public onChangedSelectedUsers(selectedUsers: User[]): void {
        console.log(selectedUsers);
    }

    public onChangedSelectedPeriod(selectedPeriod: Period): void {
        console.log(selectedPeriod);
    }
}
