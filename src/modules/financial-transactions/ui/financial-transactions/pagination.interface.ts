/**
 * Описывает параметры пагинации, которые используются в компоненте
 */
export interface IPagination {
    length: number;
    loaded: boolean;
    pageIndex: number,
    pageSize: number;
    pageSizeOptions: number[];
};