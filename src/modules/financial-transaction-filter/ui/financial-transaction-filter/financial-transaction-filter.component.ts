import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FinancialTransactionFilterFacade, TypeTransaction } from '../../core';

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
    typeOfTransaction = new FormControl();

    private typesOfTransaction: TypeTransaction[] = [];

    get TypesOfTransaction(): TypeTransaction[] {
        return this.typesOfTransaction;
    }
    set TypesOfTransaction(value: TypeTransaction[]) {
        this.typesOfTransaction = value;
    }

    constructor(private facade: FinancialTransactionFilterFacade) {

    }

    public ngOnInit(): void {
        // this.facade.getTypesTransactions()
        //     .subscribe(res => this.TypesOfTransaction = res);
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
