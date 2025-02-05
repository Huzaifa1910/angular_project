// chat.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Add ProjectSelectModalComponent
@Component({
  selector: 'app-project-select-modal',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Select Project to Chat</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Select Project</mat-label>
        <mat-select [(ngModel)]="selectedProject">
          <mat-option *ngFor="let project of projects" [value]="project">
            {{ project.nme }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" 
              [disabled]="!selectedProject"
              [mat-dialog-close]="selectedProject">Continue</button>
    </mat-dialog-actions>
  `
})
export class ProjectSelectModalComponent {
  projects: any[] = [];
  selectedProject: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.projects = data.projects; // Assign projects from dialog data
  }
}

// Updated ChatComponent
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SideNavComponent,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  template: `
  <app-sidenav [navItems]="navItems" (navigate)="onNavigate($event)"
    (openProfile)="openProfile()"
    (logout)="logout()" 
    [user]="user">
    
    <div class="container" *ngIf="selectedProject; else loading">
      <!-- Main Chat Area -->
      <div class="content">
        <!-- Project Header -->
        <div class="project-header">
          <h2>{{ selectedProject.nme }}</h2>
          <div class="project-meta">
            <span><mat-icon>person</mat-icon> {{ selectedProject.leader }}</span>
            <span><mat-icon>calendar_today</mat-icon> {{ selectedProject.startDate | date }}</span>
            <span><mat-icon>timeline</mat-icon> {{ selectedProject.duration }}</span>
          </div>
        </div>

        <!-- Chat Messages -->
        <div class="chat-messages">
          <div *ngFor="let message of messages" class="message" [class.bot]="message.isBot">
            <div class="message-content">
              {{ message.text }}
              <div class="timestamp">{{ message.timestamp | date:'shortTime' }}</div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="message-input">
          <input matInput [(ngModel)]="newMessage" placeholder="Type your message...">
          <button mat-icon-button (click)="sendMessage()">
            <mat-icon>send</mat-icon>
          </button>
        </div>
      </div>
    </div>

    <ng-template #loading>
      <div class="loading-screen">
        <mat-spinner diameter="50"></mat-spinner>
      </div>
    </ng-template>
  </app-sidenav>
  `,
  styles: [`
    /* Keep previous styles and add: */
    .loading-screen {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      height: calc(100vh - 64px);
      display: flex;
    }
    .content {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    /* Previous styles... */
  `]
})
export class ChatComponent implements OnInit{
  projects = [
    {
      nme: 'AI Chatbot Development',
      leader: 'Sarah Johnson',
      startDate: new Date('2024-01-15'),
      duration: '6 Months',
      status: 'In Progress'
    },
    {
      nme: 'Mobile App Redesign',
      leader: 'Michael Chen',
      startDate: new Date('2024-03-01'),
      duration: '3 Months',
      status: 'Planning'
    },
    {
      nme: 'Cloud Migration',
      leader: 'Emma Wilson',
      startDate: new Date('2024-02-10'),
      duration: '8 Months',
      status: 'In Progress'
    }
  ];
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.openProjectSelectModal();
  }

  openProjectSelectModal() {
    const dialogRef = this.dialog.open(ProjectSelectModalComponent, {
      width: '500px',
      disableClose: true,
      data: { projects: this.projects } // Pass projects data here
    });
  
    dialogRef.afterClosed().subscribe(selectedProject => {
      if (selectedProject) {
        this.selectedProject = selectedProject;
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  
  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Members', icon: 'people', route: '/members' },
    { label: 'Files', icon: 'description', route: '/files' },
    // { label: 'Vector Stores', icon: 'storage', route: '/vector-stores' },
    { label: 'Chat', icon: 'forum', route: '/chat' }
  ];
  selectedProject: any;
  newMessage = '';
  messages: any[] = [];
  onNavigate(route: string) {
    this.router.navigate([route]);
  }
  openProfile() {
    // Implement profile dialog
  }
  logout() {
    this.router.navigate(['/logout']);
  }
  user = {
    name: 'John Doe',
    company: 'Bubbly Corporation',
    profileImage: ''
  };

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedProject) return;

    // Add user message
    this.messages.push({
      text: this.newMessage,
      isBot: false,
      timestamp: new Date()
    });

    // Add bot response
    this.messages.push({
      text: this.getBotResponse(this.newMessage),
      isBot: true,
      timestamp: new Date()
    });

    this.newMessage = '';
  }

  private getBotResponse(message: string): string {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello')) {
      return `Hello! How can I assist you with ${this.selectedProject.nme}?`;
    }

    if (lowerMsg.includes('status')) {
      return `Current status of ${this.selectedProject.nme}: ${this.selectedProject.status}`;
    }

    if (lowerMsg.includes('team')) {
      return `The project lead is ${this.selectedProject.leader}. Would you like me to connect you with the team?`;
    }

    return `Thank you for your message regarding ${this.selectedProject.nme}. Our team will respond shortly.`;
  }
}