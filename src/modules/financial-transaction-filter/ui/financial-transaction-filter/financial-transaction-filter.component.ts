import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';

import {
    TransactionCategory,
    TransactionCategoryOption,
    TransactionStatus,
    TransactionSubCategory,
    TransactionSubCategoryFirstOption,
    TransactionSubCategorySecondOption,
    TransactionType,
    User
} from 'src/models';
import { FinancialTransactionFilterFacade, Period } from '../../core';

@Component({
    selector: 'financial-transaction-filter',
    templateUrl: './financial-transaction-filter.component.html',
    styleUrls: ['./financial-transaction-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialTransactionFilterComponent implements OnInit {
    private isTransactionCategoriesLoaded = false;
    private isTransactionCategoryOptionsLoaded = false;
    private isTransactionSubCategoriesLoaded = false;
    private isTransactionSubCategoryFirstOptionsLoaded = false;
    private allTransactionCategoryOptions: TransactionCategoryOption[] = [];
    private allTransactionSubCategories: TransactionSubCategory[] = [];
    private allTransactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[] = [];
    private transactionCategories: TransactionCategory[] = [];
    private transactionCategoryOptions: TransactionCategoryOption[] = [];
    private transactionStatuses: TransactionStatus[] = [];
    private transactionSubCategories: TransactionSubCategory[] = [];
    private transactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[] = [];
    private transactionSubCategorySecondOptions: TransactionSubCategorySecondOption[] = [];
    private transactionTypes: TransactionType[] = [];
    private users: User[] = [];

    private selectedPeriod!: Period;
    private selectedTransactionCategories: TransactionCategory[] = [];
    private selectedTransactionCategoryOptions: TransactionCategoryOption[] = [];
    private selectedTransactionStatuses: TransactionStatus[] = [];
    private selectedTransactionSubCategories: TransactionSubCategory[] = [];
    private selectedTransactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[] = [];
    private selectedTransactionSubCategorySecondOptions: TransactionSubCategorySecondOption[] = [];
    private selectedTransactionTypes: TransactionType[] = [];
    private selectedUsers: User[] = [];

    get TransactionCategories(): TransactionCategory[] {
        return this.transactionCategories;
    }
    set TransactionCategories(value: TransactionCategory[]) {
        this.transactionCategories = value;
        this.selectedTransactionCategories = [];
        this.changeDetector.detectChanges();
    }

    get TransactionCategoryOptions(): TransactionCategoryOption[] {
        return this.transactionCategoryOptions;
    }
    set TransactionCategoryOptions(value: TransactionCategoryOption[]) {
        this.transactionCategoryOptions = value;
        this.selectedTransactionCategoryOptions = [];
        this.changeDetector.detectChanges();
    }

    get TransactionStatuses(): TransactionStatus[] {
        return this.transactionStatuses;
    }
    set TransactionStatuses(value: TransactionStatus[]) {
        this.transactionStatuses = value;
        this.selectedTransactionStatuses = [];
        this.changeDetector.detectChanges();
    }

    get TransactionSubCategories(): TransactionSubCategory[] {
        return this.transactionSubCategories;
    }
    set TransactionSubCategories(value: TransactionSubCategory[]) {
        this.transactionSubCategories = value;
        this.selectedTransactionSubCategories = [];
        this.changeDetector.detectChanges();
    }

    get TransactionSubCategoryFirstOptions(): TransactionSubCategoryFirstOption[] {
        return this.transactionSubCategoryFirstOptions;
    }
    set TransactionSubCategoryFirstOptions(value: TransactionSubCategoryFirstOption[]) {
        this.transactionSubCategoryFirstOptions = value;
        this.selectedTransactionSubCategoryFirstOptions = [];
        this.changeDetector.detectChanges();
    }

    get TransactionSubCategorySecondOptions(): TransactionSubCategorySecondOption[] {
        return this.transactionSubCategorySecondOptions;
    }
    set TransactionSubCategorySecondOptions(value: TransactionSubCategorySecondOption[]) {
        this.transactionSubCategorySecondOptions = value;
        this.selectedTransactionSubCategorySecondOptions = [];
        this.changeDetector.detectChanges();
    }

    get TransactionTypes(): TransactionType[] {
        return this.transactionTypes;
    }
    set TransactionTypes(value: TransactionType[]) {
        this.transactionTypes = value;
        this.selectedTransactionTypes = [];
        this.changeDetector.detectChanges();
    }

    get Users(): User[] {
        return this.users;
    }
    set Users(value: User[]) {
        this.users = value;
        this.selectedTransactionTypes = [];
        this.changeDetector.detectChanges();
    }

    constructor(
        private readonly facade: FinancialTransactionFilterFacade,
        private readonly changeDetector: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.facade.getTransactionCategories()
            .subscribe((transactionCategories: TransactionCategory[]): void => {
                this.isTransactionCategoriesLoaded = true;
                this.TransactionCategories = transactionCategories;
            });

        this.facade.getTransactionCategoryOptions()
            .subscribe((transactionCategoryOptions: TransactionCategoryOption[]): void => {
                this.isTransactionCategoryOptionsLoaded = true;
                this.allTransactionCategoryOptions = transactionCategoryOptions;
                this.updateTransactionCategoryOptions();
            });

        this.facade.getTransactionStatuses()
            .subscribe((transactionStatuses: TransactionStatus[]): TransactionStatus[] =>
                this.TransactionStatuses = transactionStatuses);

        this.facade.getTransactionSubCategories()
            .subscribe((transactionSubCategories: TransactionSubCategory[]): void => {
                this.isTransactionSubCategoriesLoaded = true;
                this.allTransactionSubCategories = transactionSubCategories;
                this.updateTransactionSubCategories();
            });

        this.facade.getTransactionSubCategoryFirstOptions()
            .subscribe((transactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[]): void => {
                this.isTransactionSubCategoryFirstOptionsLoaded = true;
                this.allTransactionSubCategoryFirstOptions = transactionSubCategoryFirstOptions;
                this.updateTransactionSubCategoryFirstOptions();
            });

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

    public onChangedSelectedPeriod(selectedPeriod: Period): void {
        this.selectedPeriod = selectedPeriod;
    }

    public onChangedSelectedTransactionCategories(selectedTransactionCategories: TransactionCategory[]): void {
        this.selectedTransactionCategories = selectedTransactionCategories;
        this.updateTransactionCategoryOptions();
    }

    public onChangedSelectedTransactionCategoryOptions(selectedTransactionCategoryOptions: TransactionCategoryOption[]): void {
        this.selectedTransactionCategoryOptions = selectedTransactionCategoryOptions;
        this.updateTransactionSubCategories();
    }

    public onChangedSelectedTransactionStatuses(selectedTransactionStatuses: TransactionStatus[]): void {
        this.selectedTransactionStatuses = selectedTransactionStatuses;
    }

    public onChangedSelectedTransactionSubCategories(selectedTransactionSubCategories: TransactionSubCategory[]): void {
        this.selectedTransactionSubCategories = selectedTransactionSubCategories;
        this.updateTransactionSubCategoryFirstOptions();
    }

    public onChangedSelectedTransactionSubCategoryFirstOptions(selectedTransactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[]): void {
        this.selectedTransactionSubCategoryFirstOptions = selectedTransactionSubCategoryFirstOptions;
        // this.updateTransactionSubCategorySecondOptions();
    }

    public onChangedSelectedTransactionSubCategorySecondOptions(selectedTransactionSubCategorySecondOptions: TransactionSubCategorySecondOption[]): void {
        this.selectedTransactionSubCategorySecondOptions = selectedTransactionSubCategorySecondOptions;
    }

    public onChangedSelectedTransactionTypes(selectedTransactionTypes: TransactionType[]): void {
        this.selectedTransactionTypes = selectedTransactionTypes;
    }

    public onChangedSelectedUsers(selectedUsers: User[]): void {
        this.selectedUsers = selectedUsers;
    }

    private updateTransactionCategoryOptions() {
        if (this.isTransactionCategoriesLoaded && this.isTransactionCategoryOptionsLoaded) {
            let transactionCategoryOptions: TransactionCategoryOption[] = [];

            _.forEach(this.selectedTransactionCategories, (category: TransactionCategory): void => {
                const options: TransactionCategoryOption[] =
                    _.filter(
                        _.cloneDeep(this.allTransactionCategoryOptions),
                        (option: TransactionCategoryOption): boolean => option.CategoryId === category.Id
                    );

                transactionCategoryOptions = _.concat(transactionCategoryOptions, options);
            });

            this.TransactionCategoryOptions = transactionCategoryOptions;

            this.updateTransactionSubCategories();
        }
    }

    private updateTransactionSubCategories(): void {
        if (
            this.isTransactionCategoriesLoaded &&
            this.isTransactionCategoryOptionsLoaded &&
            this.isTransactionSubCategoriesLoaded
        ) {
            const categoriesWithOptions: TransactionCategory[] = [];
            const categoriesWithOutOptions: TransactionCategory[] = [];

            _.forEach(this.selectedTransactionCategories, (category: TransactionCategory): void => {
                const isCategoryWithOptions: boolean = _.filter(
                    this.allTransactionCategoryOptions,
                    (option: TransactionCategoryOption): boolean => option.CategoryId === category.Id
                ).length > 0;

                if (isCategoryWithOptions) {
                    categoriesWithOptions.push(category);
                } else {
                    categoriesWithOutOptions.push(category);
                }
            });

            let transactionSubCategories: TransactionSubCategory[] = [];

            _.forEach(categoriesWithOutOptions, (category: TransactionCategory): void => {
                const subCategories: TransactionSubCategory[] = _.filter(
                    this.allTransactionSubCategories,
                    (subCategory: TransactionSubCategory): boolean => subCategory.CategoryId === category.Id
                );

                transactionSubCategories = _.concat(transactionSubCategories, subCategories);
            });

            _.forEach(categoriesWithOptions, (category: TransactionCategory): void => {
                const options: TransactionCategoryOption[] = _.filter(
                    this.selectedTransactionCategoryOptions,
                    (option: TransactionCategoryOption): boolean => option.CategoryId === category.Id
                );

                _.forEach(options, (option: TransactionCategoryOption): void => {
                    const subCategories: TransactionSubCategory[] = _.filter(
                        this.allTransactionSubCategories,
                        (subCategory: TransactionSubCategory): boolean => subCategory.CategoryId === category.Id && subCategory.CategoryOptionId === option.Id
                    );

                    transactionSubCategories = _.concat(transactionSubCategories, subCategories);
                });
            });

            this.TransactionSubCategories = transactionSubCategories;

            this.updateTransactionSubCategoryFirstOptions();
        }
    }

    private updateTransactionSubCategoryFirstOptions(): void {
        if (
            this.isTransactionCategoriesLoaded &&
            this.isTransactionCategoryOptionsLoaded &&
            this.isTransactionSubCategoriesLoaded &&
            this.isTransactionSubCategoryFirstOptionsLoaded
        ) {
            let transactionSubCategoryFirstOptions: TransactionSubCategoryFirstOption[] = [];

            _.forEach(this.selectedTransactionSubCategories, (subCategory: TransactionSubCategory): void => {
                const firstOptions: TransactionSubCategoryFirstOption[] =
                    _.filter(
                        _.cloneDeep(this.allTransactionSubCategoryFirstOptions),
                        (option: TransactionSubCategoryFirstOption): boolean => option.SubCategoryId === subCategory.Id
                    );

                    transactionSubCategoryFirstOptions = _.concat(transactionSubCategoryFirstOptions, firstOptions);
            });

            this.TransactionSubCategoryFirstOptions = transactionSubCategoryFirstOptions;

            // this.updateTransactionSubCategories();
        } 
    }
}