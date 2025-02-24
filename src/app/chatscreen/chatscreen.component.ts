// chat.component.ts
import { Component, Inject, OnInit, NgModule, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgIf  } from '@angular/common';
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
import { Router, NavigationStart } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { navItems, getNavigationItems } from '../../main';
import { BackendApisService } from '../backend-apis.service';
import { WebsocketService } from '../ws/websocket.service';
import { marked } from 'marked';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

// Add ProjectSelectModalComponent
@Component({
  selector: 'app-project-select-modal',
  standalone: true,
  imports: [MatDialogModule,CommonModule, MatFormFieldModule, MatSelectModule, MatDialogTitle, MatButtonModule, FormsModule, MatInputModule],
  template: `
  
    <h2 mat-dialog-title>Select Project to Chat</h2>
    <mat-dialog-content class="w-full">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Select Project</mat-label>
        <mat-select [(ngModel)]="selectedProject">
          <mat-option *ngFor="let project of projects" [value]="project">
            {{ project.name }}
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
  `,
  styles: [`
    .w-full {
      width: 100%;
    }
    h2{
      margin: 0 0 10px 0;
    }
    mat-form-field {
      margin: 16px 0;
      width: 100%;
    }
    
    mat-dialog-content {
      padding: 16px !important;
    }
  `]
})
export class ProjectSelectModalComponent {
  projects: any[] = [];
  user: any;
  selectedProject: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.projects = data.projects; // Assign projects from dialog data
    this.user = data.user;
    
    console.log('Received projects:', data.projects);
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
    MatProgressSpinnerModule,
    NgIf
  ],
  providers: [BackendApisService, WebsocketService],
  template: `
  <div class="dashboardMainContainer">

<div class="sidenavContainer">
  <app-sidenav [navItems]="navItems" (navigate)="onNavigate($event)"
    (openProfile)="openProfile()"
    (logout)="logout()" 
    [user]="user">
  </app-sidenav>  
  </div>

<div class="contentContainer">
    <div class="container" *ngIf="selectedProject; else loading">
      <!-- Main Chat Area -->
      <div class="content">
        <!-- Project Header -->
        <div class="project-header">
          <h2>{{ selectedProject.name }}</h2>
          <div class="project-meta">
            <span><mat-icon>person</mat-icon> {{ selectedProject.leader }}</span>
            <span><mat-icon>calendar_today</mat-icon> {{ selectedProject.startDate | date }}</span>
            <span><mat-icon>timeline</mat-icon> {{ selectedProject.duration }}</span>
          </div>
        </div>

        <!-- Chat Messages -->
        <div class="chat-messages" #chatMessages>
          <div *ngFor="let message of messages" class="message" [class.bot]="message.isBot" [class.user]="!message.isBot">
            <div class="message-content" [innerHTML]="message.text">
              <div class="timestamp">{{ message.timestamp | date:'shortTime' }}</div>
            </div>
          </div>
        </div>
        
        <!-- Message Input -->
        <div class="message-input">
          <input matInput [(ngModel)]="newMessage"  (keyup.enter)="sendMessage()" placeholder="Type your message...">
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
    </div>
    </div>
  
  `,
  styles: [`
    /* Keep previous styles and add: */
    .loading-screen {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .content {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    .container {
      height: calc(100vh - 64px);
      width: 100%;
      float: right;
      display:flex;
    }

    .sidenav {
      width: 300px;
      padding: 20px;
      background: #f5f5f5;
      border-right: 1px solid #ddd;
    }

    .content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .project-header {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #eee;

      h2 {
        color: #0C64B6;
        margin: 0 0 10px 0;
        padding: 10px;
      }

      .project-meta {
        display: flex;
        gap: 20px;
        color: #666;

        mat-icon {
          font-size: 18px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
      background: #fafafa;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .message {
      margin-bottom: 15px;
      display: flex;

      &.bot {
        justify-content: flex-start;

        .message-content {
          background: #fff;
          border: 1px solid #ddd;
        }
      }

      &.user {
        justify-content: flex-end;

        .message-content {
          background: #0C64B6;
          color: white;
        }
      }

      .message-content {
        max-width: 70%;
        padding: 12px 16px;
        border-radius: 20px;
        display: inline-block;

        .timestamp {
          font-size: 0.75rem;
          opacity: 0.7;
          margin-top: 5px;
        }
      }
    }

    .message-input {
      display: flex;
      gap: 10px;
      border-top: 1px solid #eee;
      padding-top: 15px;

      input {
        flex: 1;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 25px;
      }
    }
    
  .dashboardMainContainer{
    display: grid;
    grid-template-columns: 250px 1fr;
    height: 100vh;
    overflow: hidden;
  }
  .contentContainer{
    overflow-y: auto;
    padding: 24px;
  }
    /* Previous styles... */
  `]
})
export class ChatComponent implements OnInit, OnDestroy {
  // response: string = '';
  projectId: string = '';

  projects: { name: string; leader: string; startDate: Date; duration: string; status: string; }[] = [];
  private projectCheckSubscription: Subscription | undefined;
  private dialogRef: MatDialogRef<ProjectSelectModalComponent> | undefined;
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;
  isTyping = false;
  routerEventsSubscription: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private backendapisservice: BackendApisService,
    private websocketService: WebsocketService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  
  get_all_projects() {
    this.backendapisservice.get_all_projects().subscribe((response: any) => {
      console.log('API response:', response);
      if (response && response.projects) {
        let all_projects: { name: any; leader: any; startDate: any; duration: any; status: any; }[] = [];
        response.projects.forEach((project: any) => {
          all_projects.push({
            name: project.p_name,
            leader: project.project_leader_name,
            startDate: project.start_date,
            duration: project.p_duration,
            status: project.status
          });
        });
        this.projects = all_projects;
        this.user = {
          name: response.user.emp_name,
          company: response.user.b_name,
          profileImage: response.user.profile_image
        }
        console.log(this.projects);
        this.openProjectSelectModal()
      } else {
        console.error('Invalid API response.');
      }
    }, error => {
      console.error('API error:', error);
      if (error.status === 401) {
        this.logout(); // Handle 401 Unauthorized error
      }
    });
  }

  async openProjectSelectModal() {
    if (this.selectedProject) {
      return; // If a project is already selected, do not show the modal
    }
    let projectName = '';
    this.dialogRef = this.dialog.open(ProjectSelectModalComponent, {
      width: '500px',
      disableClose: true,
      data: { projects: this.projects } // Pass projects data here
    });
   this.route.queryParams.subscribe(params => {
      projectName = params['projectName'];    
  })

    this.dialogRef.afterClosed().subscribe(selectedProject => {
      if (selectedProject) {
        this.selectedProject = selectedProject;
        this.startWebSocket();
      } else {
        
        if(projectName == ''){
        const dashboardRoute = this.navItems[0].route;
        this.router.navigate([dashboardRoute]);
        }
      }
    });
  }
  navItems = navItems;
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
    this.authService.clearUserData();
    this.router.navigate(['/logout']);
  }
  user = {
    name: '',
    company: '',
    profileImage: ''
  };

  startWebSocket() {
    this.messages.push({
      text: marked('_Typing..._'),
      isBot: true,
      timestamp: new Date()
    });
    this.websocketService.connect(this.selectedProject.name);

    setTimeout(() => {  // Ensure socket is initialized before subscribing
      this.websocketService.getMessages().subscribe((msg) => {
        this.isTyping = false; // Hide typing indicator
        this.messages.pop(); // Remove typing indicator
        this.messages.push(
          {
            text: marked(msg),
            isBot: true,
            timestamp: new Date()
          }
        ); // Add received message to array
        setTimeout(() => {
          this.scrollToBottom(); // Scroll to the latest message
        }, 500);
      });
    }, 500);
  }


  stopWebSocket() {
    this.websocketService.disconnect();
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedProject) return;

    // Add user message
    this.messages.push({
      text: this.newMessage,
      isBot: false,
      timestamp: new Date()
    });

    this.websocketService.sendMessage(this.newMessage);
    this.newMessage = '';
    this.isTyping = true; // Show typing indicator
    this.messages.push({
      text: marked('_Typing..._'),
      isBot: true,
      timestamp: new Date()
    });
    setTimeout(() => {
      this.scrollToBottom(); // Scroll to the latest message
    }, 500);
  }

  scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTo({
        top: this.chatMessagesContainer.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  ngOnInit() {
    this.get_all_projects(); // Ensure projects are fetched on init
    
    // Check if projectName exists in the URL
    this.route.queryParams.subscribe(params => {
      const projectName = params['projectName'];
      if (projectName) {
        this.projectCheckSubscription = interval(500).subscribe(() => {
          if (this.projects.length > 0) {
            this.initiateChatWithProject(projectName);
            this.projectCheckSubscription?.unsubscribe();
          }
        });
      }
    });

    // Subscribe to router events to detect navigation away from the component
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.stopWebSocket(); // Close WebSocket connection when navigating away
      }
    });
  }

  initiateChatWithProject(projectName: string) {
    console.log(this.projects);

    const selectedProject = this.projects.find(project => project.name === projectName);
    if (selectedProject) {
      this.selectedProject = selectedProject;
      this.startWebSocket();
      this.dialogRef?.close(); // Close the modal if it is open
    } else {
      console.error('Project not found:', projectName);
    }
  }

  ngOnDestroy() {
    // Close WebSocket connection
    this.stopWebSocket();
    this.projectCheckSubscription?.unsubscribe(); // Unsubscribe from project check
    this.routerEventsSubscription?.unsubscribe(); // Unsubscribe from router events
    console.log('ChatComponent destroyed');
  }
  private getBotResponse(message: string): string {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello')) {
      return `Hello! How can I assist you with ${this.selectedProject.name}?`;
    }

    if (lowerMsg.includes('status')) {
      return `Current status of ${this.selectedProject.name}: ${this.selectedProject.status}`;
    }

    if (lowerMsg.includes('team')) {
      return `The project lead is ${this.selectedProject.leader}. Would you like me to connect you with the team?`;
    }

    return `Thank you for your message regarding ${this.selectedProject.name}. Our team will respond shortly.`;
  }
}
