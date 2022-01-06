import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionType } from 'src/models';
import { FinancialTransactionFilterFacade } from '../../core';

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
    private transactionTypes: TransactionType[] = [];

    get TransactionTypes(): TransactionType[] {
        return this.transactionTypes;
    }
    set TransactionTypes(value: TransactionType[]) {
        this.transactionTypes = value;
        this.changeDetector.detectChanges();
    }

    constructor(
        private readonly facade: FinancialTransactionFilterFacade,
        private readonly changeDetector: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.facade.getTransactionTypes()
            .subscribe((transactionTypes: TransactionType[]): TransactionType[] =>
                this.TransactionTypes = transactionTypes);
    }

    public onChangedSelectedTransactionTypes(selectedTransactionTypes: TransactionType[]): void {
        console.log(selectedTransactionTypes);
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
