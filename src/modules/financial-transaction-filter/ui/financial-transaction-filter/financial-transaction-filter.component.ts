import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionCategory, TransactionCategoryOption, TransactionStatus, TransactionSubCategory, TransactionType, User } from 'src/models';
import { FinancialTransactionFilterFacade, Period } from '../../core';

interface Pokemon {
    value: string;
    viewValue: string;
}

interface PokemonGroup {
    disabled?: boolean;
    name: string;
    pokemon: Pokemon[];
}

@Component({
    selector: 'financial-transaction-filter',
    templateUrl: './financial-transaction-filter.component.html',
    styleUrls: ['./financial-transaction-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialTransactionFilterComponent implements OnInit {
    // (ChangeSelectedTransactionSubCategories)="onChangedSelectedTransactionSubCategories($event)"
    // [SubCategories]="TransactionSubCategories"

    private transactionCategories: TransactionCategory[] = [];
    private transactionCategoryOptions: TransactionCategoryOption[] = [];
    private transactionStatuses: TransactionStatus[] = [];
    private transactionSubCategories: TransactionSubCategory[] = [];
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

    public onChangedSelectedTransactionTypes(selectedTransactionTypes: TransactionType[]): void {
        console.log(selectedTransactionTypes);
    }

    public onChangedSelectedUsers(selectedUsers: User[]): void {
        console.log(selectedUsers);
    }

    public onChangedSelectedPeriod(selectedPeriod: Period): void {
        console.log(selectedPeriod);
    }

    pokemonControl = new FormControl();
    pokemonGroups: PokemonGroup[] = [
        {
            name: 'Grass',
            pokemon: [
                { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
                { value: 'oddish-1', viewValue: 'Oddish' },
                { value: 'bellsprout-2', viewValue: 'Bellsprout' },
            ],
        },
        {
            name: 'Water',
            pokemon: [
                { value: 'squirtle-3', viewValue: 'Squirtle' },
                { value: 'psyduck-4', viewValue: 'Psyduck' },
                { value: 'horsea-5', viewValue: 'Horsea' },
            ],
        },
        {
            name: 'Fire',
            disabled: true,
            pokemon: [
                { value: 'charmander-6', viewValue: 'Charmander' },
                { value: 'vulpix-7', viewValue: 'Vulpix' },
                { value: 'flareon-8', viewValue: 'Flareon' },
            ],
        },
        {
            name: 'Psychic',
            pokemon: [
                { value: 'mew-9', viewValue: 'Mew' },
                { value: 'mewtwo-10', viewValue: 'Mewtwo' },
            ],
        },
    ];
}
