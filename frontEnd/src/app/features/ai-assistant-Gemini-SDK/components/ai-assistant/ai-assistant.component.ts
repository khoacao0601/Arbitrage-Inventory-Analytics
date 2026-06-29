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

  // 1. Dùng getter để lấy mảng messages trực tiếp từ Service (Cache)
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

    // Service đã tự động push tin nhắn vào mảng rồi, nên ta không cần push thủ công ở đây nữa
    this.cdr.detectChanges();
    this.scrollToBottom();

    this.chatService.chatConversationStream(userMessage).subscribe({
      next: () => {
        // Service đã tự động cộng dồn chữ vào chunkText rồi, component chỉ việc vẽ lại UI
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
        // Khi AI hoàn thành stream toàn bộ văn bản
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
