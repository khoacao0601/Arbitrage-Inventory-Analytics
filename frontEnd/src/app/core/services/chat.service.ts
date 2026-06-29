import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AIChatAssistant {
    private readonly baseUrl = 'http://localhost:3000/api/chat';

    streamChat(path: string, bodyData: any): Observable<string> {
        return new Observable<string>((observer) => {
        fetch(`${this.baseUrl}/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        })
        .then(async (response) => {
            if (!response.body) {
            observer.error(new Error("No response body"));
            return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunkText = decoder.decode(value, { stream: true });
            observer.next(chunkText); // Bắn từng từ về phía Component qua hàm next()
            }
            observer.complete(); // Xong hoàn toàn
        })
        .catch((err) => observer.error(err));
        });
    }
}