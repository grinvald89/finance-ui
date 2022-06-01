import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { TransactionCategory, TransactionDirection } from 'src/models';

@Component({
    selector: 'transaction-categories',
    templateUrl: './transaction-categories.component.html',
    styleUrls: [
        './transaction-categories.component.scss',
        '../styles/fields.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionCategoriesComponent {
    private form!: FormGroup;
    private categories: TransactionCategory[] = [];
    private categoriesByDirections: TransactionCategory[] = [];
    private directions: TransactionDirection[] = [];
    private isCategoriesLoaded: boolean = false;
    private isDirectionsLoaded: boolean = false;

    get Form(): FormGroup {
        return this.form;
    }
    set Form(value: FormGroup) {
        this.form = value;
    }

    @Output()
    private ChangeSelectedTransactionCategories: EventEmitter<TransactionCategory[]> = new EventEmitter<TransactionCategory[]>();

    @Input('Categories')
    set Categories(value: TransactionCategory[]) {
        this.categories = value;
        this.isCategoriesLoaded = true;
        this.updateView();
    }
    get Categories(): TransactionCategory[] {
        return this.categories;
    }

    @Input('Directions')
    set Directions(value: TransactionDirection[]) {
        this.directions = value;
        this.isDirectionsLoaded = true;
        this.updateView();
    }
    get Directions(): TransactionDirection[] {
        return this.directions;
    }

    get CategoriesByDirections(): TransactionCategory[] {
        return this.categoriesByDirections;
    }
    set CategoriesByDirections(value: TransactionCategory[]) {
        this.categoriesByDirections = value;
    }

    constructor(private readonly formBuilder: FormBuilder) {
        this.createForm();
    }

    public compareCategories(t1: TransactionCategory, t2: TransactionCategory) {
        if (_.isUndefined(t1) || _.isUndefined(t2)) {
            return true;
        }

        return t1.Id === t2.Id;
    }

    private updateView(): void {
        if (!this.isCategoriesLoaded || !this.isDirectionsLoaded) {
            return;
        }

        this.createForm();
        this.updateCategoriesByDirections();
        this.setSelectedFormValues();
    }

    private createForm(): void {
        this.Form = this.formBuilder.group({
            categories: new FormControl('')
        });

        this.Form.valueChanges
            .subscribe(() => {
                if (this.Form.valid) {
                    this.ChangeSelectedTransactionCategories.emit(this.Form.value.categories)
                }
            });
    }

    private setSelectedFormValues(): void {
        this.Form.controls['categories'].setValue(this.CategoriesByDirections);
    }

    private updateCategoriesByDirections(): void {
        let categoriesByDirections: TransactionCategory[] = [];

        _.forEach(this.Directions, (direction: TransactionDirection): void => {
            const categories: TransactionCategory[] =
                _.filter(
                    _.cloneDeep(this.Categories),
                    (category: TransactionCategory): boolean => category.DirectionId === direction.Id
                );

                categoriesByDirections = _.concat(categoriesByDirections, categories);
        });

        this.CategoriesByDirections = categoriesByDirections;
    }
}
