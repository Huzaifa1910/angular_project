// chat.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ChatbotService } from './chatbot.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {
  constructor(private chatbot: ChatbotService, private router: Router) {}

  canActivate(): boolean {
    if (!this.chatbot.getConfig()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}