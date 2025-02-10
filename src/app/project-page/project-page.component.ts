import { Component, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailComponent } from '../project-details/project-details.component';
import { ProjectsListComponent } from '../projects/projects.component';
import { MembersListComponent } from '../members/members.component';
import { FileListComponent } from '../files/files.component';
import { SideNavComponent } from '../sidenav/sidenav.component';
import { Router } from '@angular/router';
import { navItems } from '../../main';
@Component({
  selector: 'app-project-page',
  imports: [ MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, RouterModule, MatCardModule, MatProgressBarModule, MatMenuModule, ProjectDetailComponent, ProjectsListComponent, MembersListComponent, FileListComponent, SideNavComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css',
  template: `
    <mat-card ...>
      <mat-card-header>
        <mat-card-title>{{ project.name }}</mat-card-title>
        <mat-card-subtitle>
          Leader: {{ project.leader }} | Duration: {{ project.duration }}
          <button mat-icon-button [matMenuTriggerFor]="projectMenu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #projectMenu="matMenu">
            <button mat-menu-item (click)="openChat(project)">
              <mat-icon>chat</mat-icon>
              Chat about this project
            </button>
          </mat-menu>
        </mat-card-subtitle>
      </mat-card-header>
      ...
    </mat-card>
  `
})
export class ProjectPageComponent {
  @Output() chatRequested = new EventEmitter<any>();

  openChat(project: any) {
    this.chatRequested.emit(project);
  }
    user = {
      name: 'John Doe',
      company: 'Knowledge Bridge Corporation',
      profileImage: ''
    };
  
    navItems = navItems;
    projects = [
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'AI Chatbot Development',
        leader: 'Sarah Johnson',
        duration: '6 Months',
        startDate: new Date('2024-07-15'),
        status: 'ongoing'
      },
      {
        name: 'Mobile App Redesign',
        leader: 'Michael Chen',
        duration: '3 Months',
        startDate: new Date('2024-06-01'),
        status: 'ongoing'
      },
      {
        name: 'Mobile App Redesign',
        leader: 'Michael Chen',
        duration: '3 Months',
        startDate: new Date('2024-02-01'),
        status: 'ongoing'
      },
      {
        name: 'Mobile App Redesign',
        leader: 'Michael Chen',
        duration: '3 Months',
        startDate: new Date('2024-07-01'),
        status: 'ongoing'
      },
      // Add more projects as needed
    ];
    recentFiles = [
      {
        name: 'Project-Requirements.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploader: 'Sarah Johnson',
        uploadDate: new Date('2024-05-20'),
      },
      
      {
        name: 'Project-Requirements.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploader: 'Sarah Johnson',
        uploadDate: new Date('2024-07-20'),
      },
      
      {
        name: 'Project-Requirements.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploader: 'Sarah Johnson',
        uploadDate: new Date('2024-06-20'),
      },
      
      {
        name: 'Project-Requirements.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploader: 'Sarah Johnson',
        uploadDate: new Date('2024-04-20'),
      },
      
      {
        name: 'Project-Requirements.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploader: 'Sarah Johnson',
        uploadDate: new Date('2024-05-20'),
      },
      
      // Add more files as needed
    ];
    newMembers = [
      {
        name: 'Emma Wilson',
        1: '',
        addedBy: 'Sarah Johnson',
        project: 'AI Chatbot Development',
        addedDate: new Date('2024-05-20'),
      },
      {
        name: 'David Lee',
        profileImage: '',
        addedBy: 'Michael Chen',
        project: 'Mobile App Redesign',
        addedDate: new Date('2024-05-19'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      {
        name: 'Sophia Martinez',
        profileImage: '',
        addedBy: 'Alex Thompson',
        project: 'Cloud Migration',
        addedDate: new Date('2024-05-18'),
      },
      // Add more members as needed
    ];
    getFileIcon(fileType: string): string {
      const iconMap: {[key: string]: string} = {
        'pdf': 'picture_as_pdf',
        'folder': 'folder',
        'image': 'insert_photo',
        'doc': 'description',
        'default': 'insert_drive_file'
      };
      return iconMap[fileType] || iconMap['default'];
    }
  
  
   
    onNavigate(route: string) {
      this.router.navigate([route]);
    }
    addProject() {
      // Implement project creation logic
    }
  
    openProfile() {
      // Implement profile dialog
    }
  
    logout() {
      this.router.navigate(['/logout']);
    }
    openFileDetails(file: any) {
      // Implement file detail view logic
    }
    
    
    handleFileMenu(event: {file: any, action: string}) {
      // Handle menu actions
      console.log('Menu action:', event.action, 'on file:', event.file);
    }
    constructor(private dialog: MatDialog, private router: Router) {
  
    }
    openProjectDetails(project: any): void {
      // You would typically fetch real data here
      const dialogData = {
        project: project,
        team: [
          { name: 'Sarah Johnson', role: 'Project Lead', profileImage: '' },
          { name: 'Michael Chen', role: 'Developer', profileImage: '' },
          { name: 'Emma Wilson', role: 'Designer', profileImage: '' }
        ],
        documents: this.recentFiles.filter(f => f.type === 'pdf') // Example filter
      };
    
      this.dialog.open(ProjectDetailComponent, {
        width: '90%',
        maxWidth: '800px',
        data: dialogData
      });
    }
}
