import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ItemsApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:3000/api';

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${path}`, { params });
    }
}