import { Injectable, inject } from '@angular/core';
import { ItemsApiService } from '../../core/services/items.service';
import { Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root' 
})

export class ItemsService {
    private readonly itemsAPIService = inject(ItemsApiService);

    private cachedItems: any[] | null = null;


    getAllItems(): Observable<any> {
        if (this.cachedItems) {
            return of({ data: this.cachedItems }); 
        }

        return this.itemsAPIService.get<any>('items').pipe(
            tap(response => {
                this.cachedItems = response.data;
            })
        );
    }

    addAnItem(body: any): Observable<any> {
        return this.itemsAPIService.post<any>('items', body).pipe(
            tap(response => {
                this.cachedItems = null;
            })
        );
    }
}
