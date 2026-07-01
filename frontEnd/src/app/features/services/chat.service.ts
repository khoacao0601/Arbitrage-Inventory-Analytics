import { Injectable, inject } from '@angular/core';
import { AIChatAssistant } from '../../core/services/chat.service';
import { Observable, tap } from 'rxjs';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

@Injectable({ providedIn: 'root' })
    export class AIChatAssistantService {
    private readonly chatAPI = inject(AIChatAssistant);

    private chatHistory: ChatMessage[] = [];

    getHistory(): ChatMessage[] {
        return this.chatHistory;
    }

    addMessageToCache(role: 'user' | 'assistant', content: string) {
        this.chatHistory.push({ role, content });
    }

    clearCache() {
        this.chatHistory = [];
    }

    chatConversationStream(userMessage: string): Observable<string> {
        const body = {
        message: userMessage,
        context: 'User is working on Home screen',
        };

        this.addMessageToCache('user', userMessage);

        this.addMessageToCache('assistant', '');

        return this.chatAPI.streamChat('', body).pipe(
        tap({
            next: (chunkText) => {
            const lastMsg = this.chatHistory.at(-1);
            if (lastMsg?.role === 'assistant') {
                lastMsg.content += chunkText;
            }
            },
            error: () => {
            // Store Error warning to Cache if no internet
            const lastMsg = this.chatHistory.at(-1);
            if (lastMsg?.role === 'assistant' && !lastMsg.content) {
                lastMsg.content = 'Sorry, bad connection to AI Server.';
            }
            },
        }),
        );
    }
}
