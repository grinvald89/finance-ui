import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CONFIG } from 'src/config/config';
import { ITransactionFilter, ITransactionTotalAmount } from 'src/models';

@Injectable({
    providedIn: 'root'
})
export class DashboardRepository {
    constructor(private readonly http: HttpClient) { }

    public login(username: string, password: string): Observable<string> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<string>(
            `${CONFIG.baseUrl}/api/authentication/login`,
            {
                "UserName": username,
                "Password": password
            },
            {
                headers
            }
        );
    }

    public getTransactionTotalAmount(filter: ITransactionFilter): Observable<ITransactionTotalAmount> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const queryParams: string = `filter=${JSON.stringify(filter)}`;

        return this.http.get<ITransactionTotalAmount>(
            `${CONFIG.baseUrl}/api/transaction-total-amount?${queryParams}`,
            {
                headers
            }
        );
    }
}