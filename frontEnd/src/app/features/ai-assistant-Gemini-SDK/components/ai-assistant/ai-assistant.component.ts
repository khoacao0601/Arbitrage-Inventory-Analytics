import { Component, ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}


@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss']
})
export class AiAssistantComponent {
  userInput: string = '';
  messages: ChatMessage[] = [];
  isLoading: boolean = false;

  @ViewChild('scrollContainer') private readonly scrollContainer!: ElementRef;
  @ViewChild('chatInput') private readonly chatInput!: ElementRef;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Failed to scroll chat container:', err);
    }
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    // 1. Add user message to array and remove text in input
    const userMessage = this.userInput;
    this.messages.push({ role: 'user', content: userMessage });
    this.userInput = '';

    // 2. Add 1 empty message of assistant to prepare catch new words
    this.messages.push({ role: 'assistant', content: '' });
    this.isLoading = true;

    this.cdr.detectChanges(); 

    this.scrollToBottom();

    try {
        // 3. Use Fetch API to call Backend
        const response = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            message: userMessage,
            // Optional to send more context
            context: 'User is working on Home screen' 
          })
        });
        if (!response.body) throw new Error("No response body");

        // 4. Start Stream reader and decode Bytes to Text
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // 5. Decode the data just recieved
          const chunkText = decoder.decode(value, { stream: true });
          
          // 6. Add word to last message of AI (Affect typing)
          const lastMessage = this.messages.at(-1);
          if (lastMessage) {
            lastMessage.content += chunkText;
          }

          this.cdr.detectChanges();
          this.scrollToBottom();
        }
    } catch (error) {
        console.error("Error connection to AI:", error);
        const lastMessage = this.messages.at(-1);
        if (lastMessage) {
          lastMessage.content = "Sorry, bad connection to AI Server.";
        }
    } finally {
        this.isLoading = false;
        setTimeout(() => this.chatInput.nativeElement.focus(), 0)
    }
  }
}

