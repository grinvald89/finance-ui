import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import {
    TransactionDirection,
    TransactionCategory,
    TransactionStatus,
    TransactionTag,
    TransactionType,
    User,
    ITransactionFilter,
    IPeriod
} from 'src/models';
import { FinancialTransactionFilterFacade } from '../../core';

interface IFilterInitStatus {
    categories: boolean;
    directions: boolean;
    payers: boolean;
    statuses: boolean;
    tags: boolean;
    types: boolean;
}

@Component({
    selector: 'financial-transaction-filter',
    templateUrl: './financial-transaction-filter.component.html',
    styleUrls: ['./financial-transaction-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialTransactionFilterComponent implements OnInit {
    @Output() UpdateTransactionFilter: EventEmitter<ITransactionFilter> = new EventEmitter<ITransactionFilter>();

    private filterInitStatus: IFilterInitStatus = {
        categories: false,
        directions: false,
        payers: false,
        statuses: false,
        tags: false,
        types: false
    };

    private isTransactionDirectionsLoaded = false;
    private isTransactionCategoriesLoaded = false;
    private isTransactionStatusesLoaded = false;
    private isTransactionTypesLoaded = false;
    private isTransactionTagsLoaded = false;

    private allTransactionDirections: TransactionDirection[] = [];
    private allTransactionCategories: TransactionCategory[] = [];
    private allTransactionStatuses: TransactionStatus[] = [];
    private allTransactionTypes: TransactionType[] = [];
    private allTransactionTags: TransactionTag[] = [];
    private allUsers: User[] = [];

    private selectedPeriod!: IPeriod;
    private selectedTransactionDirections: TransactionDirection[] = [];
    private selectedTransactionCategories: TransactionCategory[] = [];
    private selectedTransactionStatuses: TransactionStatus[] = [];
    private selectedTransactionTypes: TransactionType[] = [];
    private selectedTransactionTags: TransactionTag[] = [];
    private selectedUsers: User[] = [];

    get SelectedTransactionDirections(): TransactionDirection[] {
        return this.selectedTransactionDirections;
    }
    set SelectedTransactionDirections(value: TransactionDirection[]) {
        this.selectedTransactionDirections = value;
        this.changeDetector.detectChanges();
    }

    get TransactionDirections(): TransactionDirection[] {
        return this.allTransactionDirections;
    }
    set TransactionDirections(value: TransactionDirection[]) {
        this.allTransactionDirections = value;
        this.SelectedTransactionDirections = [];
        this.changeDetector.detectChanges();
    }

    get TransactionCategories(): TransactionCategory[] {
        return this.allTransactionCategories;
    }
    set TransactionCategories(value: TransactionCategory[]) {
        this.allTransactionCategories = value;
        this.selectedTransactionCategories = [];
        this.changeDetector.detectChanges();
    }

    get TransactionStatuses(): TransactionStatus[] {
        return this.allTransactionStatuses;
    }
    set TransactionStatuses(value: TransactionStatus[]) {
        this.allTransactionStatuses = value;
        this.selectedTransactionStatuses = [];
        this.changeDetector.detectChanges();
    }

    get TransactionTypes(): TransactionType[] {
        return this.allTransactionTypes;
    }
    set TransactionTypes(value: TransactionType[]) {
        this.allTransactionTypes = value;
        this.selectedTransactionTypes = [];
        this.changeDetector.detectChanges();
    }

    get TransactionTags(): TransactionTag[] {
        return this.allTransactionTags;
    }
    set TransactionTags(value: TransactionTag[]) {
        this.allTransactionTags = value;
        this.selectedTransactionTags = [];
        this.changeDetector.detectChanges();
    }

    get Users(): User[] {
        return this.allUsers;
    }
    set Users(value: User[]) {
        this.allUsers = value;
        this.selectedUsers = [];
        this.changeDetector.detectChanges();
    }

    constructor(
        private readonly facade: FinancialTransactionFilterFacade,
        private readonly changeDetector: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.facade.getTransactionDirections()
            .subscribe((transactionDirections: TransactionDirection[]): void => {
                this.isTransactionDirectionsLoaded = true;
                this.TransactionDirections = transactionDirections;
                localStorage.setItem('transaction-directions', JSON.stringify(transactionDirections));
            });

        this.facade.getTransactionCategories()
            .subscribe((transactionCategories: TransactionCategory[]): void => {
                this.isTransactionCategoriesLoaded = true;
                this.TransactionCategories = transactionCategories;
                localStorage.setItem('transaction-categories', JSON.stringify(transactionCategories));
            });

        this.facade.getTransactionStatuses()
            .subscribe((transactionStatuses: TransactionStatus[]): void => {
                this.isTransactionStatusesLoaded = true;
                this.TransactionStatuses = transactionStatuses;
                localStorage.setItem('transaction-statuses', JSON.stringify(transactionStatuses));
            });

        this.facade.getTransactionTypes()
            .subscribe((transactionTypes: TransactionType[]): void => {
                this.isTransactionTypesLoaded = true;
                this.TransactionTypes = transactionTypes;
                localStorage.setItem('transaction-types', JSON.stringify(transactionTypes));
            });

        this.facade.getTransactionTags()
            .subscribe((transactionTags: TransactionTag[]): void => {
                this.isTransactionTagsLoaded = true;
                this.allTransactionTags = transactionTags;
                localStorage.setItem('transaction-tags', JSON.stringify(transactionTags));
            });

        this.facade.getUsers()
            .subscribe((users: User[]): void => {
                this.Users = _.filter(
                    users,
                    (user: User): boolean =>
                        // Todo: Вынести roleId в константу приложения
                        _.findIndex(user.Roles, role => role.Id === "c6b374d7-4cd5-4e44-8d38-352756aef638") !== -1
                );

                localStorage.setItem('payers', JSON.stringify(this.Users));
            });
    }

    public onChangedSelectedPeriod(selectedPeriod: IPeriod): void {
        this.selectedPeriod = selectedPeriod;
        this.updateTransactions();
    }

    public onChangedSelectedTransactionDirections(selectedTransactionDirections: TransactionDirection[]): void {
        this.SelectedTransactionDirections = selectedTransactionDirections;
        this.filterInitStatus.directions = true;
        this.updateTransactions();
    }

    public onChangedSelectedTransactionCategories(selectedTransactionCategories: TransactionCategory[]): void {
        this.selectedTransactionCategories = selectedTransactionCategories;
        this.filterInitStatus.categories = true;
        this.updateTransactions();
    }

    public onChangedSelectedTransactionStatuses(selectedTransactionStatuses: TransactionStatus[]): void {
        this.selectedTransactionStatuses = selectedTransactionStatuses;
        this.filterInitStatus.statuses = true;
        this.updateTransactions();
    }

    public onChangedSelectedTransactionTypes(selectedTransactionTypes: TransactionType[]): void {
        this.selectedTransactionTypes = selectedTransactionTypes;
        this.filterInitStatus.types = true;        
        this.updateTransactions();
    }

    public onChangedSelectedTransactionTags(selectedTransactionTags: TransactionTag[]): void {
        this.selectedTransactionTags = selectedTransactionTags;
        this.filterInitStatus.tags = true;
        this.updateTransactions();
    }

    public onChangedSelectedUsers(selectedUsers: User[]): void {
        this.selectedUsers = selectedUsers;
        this.filterInitStatus.payers = true;
        this.updateTransactions();
    }

    private updateTransactions(): void {
        if (!this.isFilterInitialized()) {
            return;
        }

        const filter: ITransactionFilter = {
            categoryIds: _.map(this.selectedTransactionCategories, (item: TransactionCategory): string => item.Id),
            directionIds: _.map(this.selectedTransactionDirections, (item: TransactionDirection): string => item.Id),
            payerIds: _.map(this.selectedUsers, (item: User): string => item.Id),
            period: this.selectedPeriod,
            statusIds: _.map(this.selectedTransactionStatuses, (item: TransactionStatus): string => item.Id),
            tagIds: _.map(this.selectedTransactionTags, (item: TransactionTag): string => item.Id),
            typeIds: _.map(this.selectedTransactionTypes, (item: TransactionType): string => item.Id)
        };

        this.UpdateTransactionFilter.emit(filter);
    }

    private isFilterInitialized(): boolean {
        for (const prop in this.filterInitStatus) {
            const isPropExist: boolean = this.filterInitStatus.hasOwnProperty(prop);

            if (isPropExist && !(this.filterInitStatus as any)[prop]) {
                return false;
            }
        }

        return true;
    }
}