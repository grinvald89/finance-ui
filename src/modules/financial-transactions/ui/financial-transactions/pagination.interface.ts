/**
 * Описывает параметры пагинации, которые используются в компоненте
 */
export interface IPagination {
    readonly length: number;
    readonly loaded: boolean;
    readonly pageIndex: number,
    readonly pageSize: number;
    readonly pageSizeOptions: number[];
};