// chatbot.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private chatConfig: any;

  setConfig(config: any) {
    this.chatConfig = config;
  }

  getConfig() {
    return this.chatConfig;
  }

  getResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    const project = this.chatConfig.project;

    // Project-specific responses
    if (lowerMessage.includes('hello')) {
      return `Hello ${this.chatConfig.userName}! How can I assist you with ${project.name}?`;
    }

    if (lowerMessage.includes('status')) {
      return `The current status of ${project.name} is: ${project.status}. The project lead is ${project.leader}.`;
    }

    if (lowerMessage.includes('deadline')) {
      return `${project.name} is scheduled to complete in ${project.duration}. Started on ${project.startDate.toDateString()}.`;
    }

    // Add more project-specific responses as needed
    return "Thank you for your message. Our team will get back to you shortly.";
  }
}