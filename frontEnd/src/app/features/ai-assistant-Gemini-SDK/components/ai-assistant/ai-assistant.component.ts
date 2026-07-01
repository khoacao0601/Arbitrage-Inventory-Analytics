import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AIChatAssistantService } from '../../../services/chat.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss'],
})
export class AiAssistantComponent {
  userInput: string = '';
  isLoading: boolean = false;

  @ViewChild('scrollContainer') private readonly scrollContainer!: ElementRef;
  @ViewChild('chatInput') private readonly chatInput!: ElementRef;

  private readonly chatService = inject(AIChatAssistantService);

  // 1. Using getter to get array messages directly from Service (Cache)
  get messages(): ChatMessage[] {
    return this.chatService.getHistory();
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Failed to scroll chat container:', err);
    }
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.userInput = '';
    this.isLoading = true;

    // Service already push messages in to array, we don't need to do it here
    this.cdr.detectChanges();
    this.scrollToBottom();

    this.chatService.chatConversationStream(userMessage).subscribe({
      next: () => {
        // Service already concat letters to chunkText, component only re-render UI
        this.cdr.detectChanges();
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Error connecting to AI:', error);
        const lastMessage = this.messages.at(-1);
        if (lastMessage) {
          lastMessage.content = 'Sorry, bad connection to AI Server.';
        }
        this.handleFinalize();
      },
      complete: () => {
        // when AI complete, stream all text
        this.handleFinalize();
      },
    });
  }

  clearChat() {
    this.chatService.clearCache();
  }

  private handleFinalize() {
    this.isLoading = false;
    this.cdr.detectChanges();
    setTimeout(() => {
      if (this.chatInput?.nativeElement) {
        this.chatInput.nativeElement.focus();
      }
    }, 0);
  }
}
