import { IPeriod } from '.';

export interface ITransactionFilter {
    readonly categoryIds: string[];
    readonly directionIds: string[];
    readonly payerIds: string[];
    readonly period?: IPeriod;
    readonly statusIds: string[];
    readonly tagIds: string[];
    readonly typeIds: string[];
}