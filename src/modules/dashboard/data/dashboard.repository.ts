import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
            'https://localhost:7062/api/authentication/login',
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