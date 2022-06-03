import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CONFIG } from 'src/config/config';

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
}