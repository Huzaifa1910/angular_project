import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { ChatComponent } from '../chatscreen/chatscreen.component';
import { ChatbotService } from '../chatbot.service';
import { ChatGuard } from '../chat.guard';
import { navItems, getNavigationItems } from '../../main';
import { ChatInitFormComponent } from '../chatinitformcomponent/chatinitformcomponent.component';
import { BackendApisService } from '../backend-apis.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './memberdashboard.component.html',
  styleUrls: ['./memberdashboard.component.css'],
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    ProjectsListComponent,
    MembersListComponent,
    FileListComponent,
    SideNavComponent
  ],
  // template: `
  //   <app-sidenav 
  //     [user]="user"
  //     [navItems]="navItems"
  //     (navigate)="onNavigate($event)"
  //     (openProfile)="openProfile()"
  //     (logout)="logout()">
      
      
    // <mat-sidenav-container class="sidenav-container">
    //   <mat-sidenav-content>
    //   <!-- Dashboard Content -->
    //   <div class="dashboard-content">
    //     <!-- Stats Cards -->
    //     <div class="stats-grid">
    //       <mat-card class="stats-card">
    //         <mat-card-header>
    //           <mat-icon mat-card-avatar>storage</mat-icon>
    //           <mat-card-title>Storage Used</mat-card-title>
    //         </mat-card-header>
    //         <mat-card-content>
    //           <h2>4.79/10 GB</h2>
    //           <mat-progress-bar mode="determinate" value="47.9"></mat-progress-bar>
    //           <div class="stats-status">59% remaining</div>
    //         </mat-card-content>
    //       </mat-card>

    //       <mat-card class="stats-card">
    //         <mat-card-header>
    //           <mat-icon mat-card-avatar>people</mat-icon>
    //           <mat-card-title>Total Members</mat-card-title>
    //         </mat-card-header>
    //         <mat-card-content>
    //           <h2>24</h2>
    //           <div class="stats-status">+3 this month</div>
    //         </mat-card-content>
    //       </mat-card>

    //       <mat-card class="stats-card">
    //         <mat-card-header>
    //           <mat-icon mat-card-avatar>folder</mat-icon>
    //           <mat-card-title>Active Projects</mat-card-title>
    //         </mat-card-header>
    //         <mat-card-content>
    //           <h2>15</h2>
    //           <div class="stats-status">4 overdue</div>
    //         </mat-card-content>
    //       </mat-card>
    //     </div>

    //     <!-- Project Cards -->
    //     <app-projects-list 
    //       [projects]="projects"
    //       title="Ongoing Projects"
    //       (projectSelected)="openProjectDetails($event)">
    //     </app-projects-list>

    //     <!-- Action Buttons -->
    //     <div class="action-buttons">
    //       <button mat-fab color="primary" (click)="addProject()">
    //         <mat-icon>add</mat-icon>
    //       </button>
    //       <button mat-fab color="accent" (click)="addMember()">
    //         <mat-icon>person_add</mat-icon>
    //       </button>
    //     </div>
    //   </div>
    //   <div class="dashboard-content">
    //     <!-- ... existing sections ... -->

    //     <!-- New Members Section -->
    //     <app-members-list 
    //       [members]="newMembers"
    //       title="Recently Added Members">
    //     </app-members-list>

    //     <!-- ... action buttons ... -->
    //   </div>
    //   <div class="dashboard-content">
    //     <!-- ... existing stats and projects ... -->

    //     <!-- Recent Files Section -->
    //     <app-file-list 
    //   [files]="recentFiles"
    //   title="Recent Files"
    //   (fileSelected)="openFileDetails($event)"
    //   (menuAction)="handleFileMenu($event)">
    // </app-file-list>

    //     <!-- ... action buttons ... -->
    //   </div>
    //     <ng-content></ng-content>
    //   </mat-sidenav-content>
    // </mat-sidenav-container>
    // <router-outlet></router-outlet>
      
  //     </app-sidenav>
  // `,
  // styles: [
  //   `
  //   .dashboard-content {
  //   padding: 24px;
  //   max-width: 1200px;
  //   margin: 0 auto;
  // }

  // .stats-grid {
  //   display: grid;
  //   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  //   gap: 24px;
  //   margin-bottom: 32px;
  // }

  // .stats-card {
  //   h2 {
  //     font-size: 2.2rem;
  //     margin: 16px 0;
  //     color: var(--primary-color);
  //   }

  //   .stats-status {
  //     color: #666;
  //     font-size: 0.9rem;
  //     margin-top: 8px;
  //   }
  // }

  // .projects-section {
  //   margin-top: 32px;
  // }

  // .section-title {
  //   color: var(--text-color);
  //   margin-bottom: 24px;
  // }

  // .projects-grid {
  //   display: grid;
  //   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  //   gap: 24px;
  // }

  // .project-card {
  //   &.ongoing {
  //     border-left: 4px solid #0C64B6;
  //   }
  //   &.delayed {
  //     border-left: 4px solid #ff4081;
  //   }
  //   &.completed {
  //     border-left: 4px solid #4CAF50;
  //   }

  //   .project-meta {
  //     margin-top: 16px;
  //     .milestone {
  //       display: flex;
  //       align-items: center;
  //       gap: 8px;
  //       color: #666;
  //       margin-bottom: 12px;
  //     }
  //   }
  // }

  // .action-buttons {
  //   position: fixed;
  //   bottom: 32px;
  //   right: 32px;
  //   display: flex;
  //   gap: 16px;
  // }

  //   .sidenav-container {
  //     height: 100vh;
  //     position: relative;
  //     --primary-color: #0C64B6;
  //     --text-color: #1A1A1A;
  //     --hover-bg: rgba(12, 100, 182, 0.08);
  //   }

  //   .sidenav {
  //     width: 250px;
  //     transition: width 0.3s ease;
  //     background: #FFFFFF;
  //     box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  //   }

  //   .profile-header {
  //     padding: 24px 16px;
  //     border-bottom: 1px solid #F0F0F0;
  //     text-align: center;
  //     transition: all 0.3s ease;
  //   }

  //   .profile-image-container {
  //     position: relative;
  //     margin: 0 auto;
  //     width: 60px;
  //     height: 60px;
  //     transition: all 0.3s ease;
  //   }

  //   .profile-image {
  //     width: 100%;
  //     height: 100%;
  //     border-radius: 50%;
  //     object-fit: cover;
  //     border: 2px solid var(--primary-color);
  //     transition: all 0.3s ease;
  //   }

  //   .profile-initial {
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     width: 40px;
  //     height: 40px;
  //     background: var(--primary-color);
  //     color: white;
  //     border-radius: 50%;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     font-weight: bold;
  //     font-size: 18px;
  //   }

  //   .profile-info {
  //     margin-top: 16px;
  //     transition: opacity 0.2s ease;
  //   }

  //   .username {
  //     margin: 0;
  //     font-size: 16px;
  //     font-weight: 600;
  //     color: var(--text-color);
  //   }

  //   .company {
  //     margin: 4px 0 0;
  //     font-size: 12px;
  //     color: #666;
  //   }

  //   mat-nav-list {
  //     padding-top: 0;
  //     flex-grow: 1;
  //   }

  //   mat-list-item {
  //     margin: 4px 8px;
  //     border-radius: 6px;
  //     transition: all 0.2s ease;
  //     color: var(--text-color);
  //     height: 48px !important;
      
  //     &.active {
  //       background-color: var(--primary-color);
  //       color: white !important;
  //       mat-icon {
  //         color: white !important;
  //       }
  //     }
  //     &.active .nav-label {
  //       color: white !important;
  //     }

  //     mat-icon {
  //       margin-right: 16px;
  //       transition: margin 0.3s ease;
  //     }
  //   }

  //   .nav-label {
  //     transition: opacity 0.2s ease;
  //     opacity: 1;
  //   }

  //   .bottom-section {
  //     padding: 16px;
  //     border-top: 1px solid #F0F0F0;
  //     display: flex;
  //     flex-direction: column;
  //     gap: 12px;

  //     button {
  //       display: flex;
  //       align-items: center;
  //       width: 100%;
  //       padding: 12px 16px;
  //       border-radius: 6px;
  //       color: var(--text-color);
  //       transition: all 0.2s ease;
        
  //       mat-icon {
  //         margin-right: 16px;
  //         transition: margin 0.3s ease;
  //       }
  //     }
  //   }

  //   .mat-sidenav-content {
  //     margin-left: 0 !important; /* Remove default margin for overlay mode */
  //   }
  //   .files-section {
  //   margin-top: 32px;
  // }

  // .file-item {
  //   border-bottom: 1px solid #eee;
  //   &:last-child {
  //     border-bottom: none;
  //   }
    
  //   &:hover {
  //     background-color: rgba(12, 100, 182, 0.04);
  //   }
  // }

  // .file-meta {
  //   color: #666;
  //   font-size: 0.9rem;
  //   display: flex;
  //   gap: 8px;
  //   align-items: center;
  // }

  // mat-icon[matListItemIcon] {
  //   color: var(--primary-color);
  //   margin-right: 16px;
  // }
  // /* Add members section styles */
  // .members-section {
  //   margin-top: 32px;
  // }

  // .members-grid {
  //   display: grid;
  //   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  //   gap: 24px;
  // }

  // .member-card {
  //   mat-card-header {
  //     margin-bottom: 16px;
      
  //     img {
  //       width: 50px;
  //       height: 50px;
  //       border-radius: 50%;
  //       object-fit: cover;
  //       border: 2px solid var(--primary-color);
  //     }
  //   }

  //   .member-meta {
  //     display: flex;
  //     flex-direction: column;
  //     gap: 12px;
  //   }

  //   .meta-item {
  //     display: flex;
  //     align-items: center;
  //     gap: 8px;
  //     color: #666;

  //     mat-icon {
  //       font-size: 20px;
  //       width: 20px;
  //       height: 20px;
  //     }
  //   }
  // }
  // .nav-content {
  //   display: flex;
  //   flex-direction: column;
  //   height: 100%;
  //   box-sizing: border-box;
  // }

  // .spacer {
  //   flex: 1;
  //   min-height: 20px; /* Ensures minimum space */
  // }

  // .bottom-section {
  //   padding: 16px;
  //   border-top: 1px solid #F0F0F0;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 12px;
  //   margin-top: auto; /* Pushes to bottom */
  //   background: #fff; /* Optional: solid background */
  //   position: sticky;
  //   bottom: 0;
  //   z-index: 2;
  // }

  // /* Add these to ensure proper height containment */
  // .mat-sidenav-container, .mat-sidenav {
  //   height: 100vh;
  //   box-sizing: border-box;
  // }
  //   `
  // ]
})
export class MemberdashboardComponent implements OnInit{
  
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isCollapsed = false;
  selectedRoute = '/dashboard';
  
  constructor(private dialog: MatDialog, private router: Router, private chatbotService: ChatbotService, private backendapisservice: BackendApisService, private cdr: ChangeDetectorRef, private authService: AuthService) {

  }
  storageUsed = 0;
  storageRemains = 0;
  totalMembers = 24;
  newMembersThisMonth = 3;
  activeProjects = 15;
  getDataWithAuth() {
    this.backendapisservice.getDataWithAuth('/get_dashboard_data').subscribe((response: any) => {
      console.log('API response:', response);
      if (response && response.business_data) {
        // this.projects = response.business_data.new_projects || [];
        var new_projects = [];
        var new_members = [];
        var new_docs = [];
        // this.newMembers = response.business_data.new_employees || [];
        for(let i=0; i<response.business_data.new_employees.length; i++){
          var memberData: { name: string; profileImage: string; addedBy: string; project: string; addedDate: Date, role: string } = {
            name: '',
            profileImage: '',
            addedBy: '',
            project: '',
            role: '',
            addedDate: new Date()
          };
          memberData['name'] = response.business_data.new_employees[i].emp_name;
          memberData['profileImage'] = response.business_data.new_employees[i].emp_profile_image;
          memberData['addedBy'] = response.business_data.new_employees[i].added_by_name;
          if (response.business_data.new_employees[i].projects.length > 0){
            console.log(response.business_data.new_employees[i].projects)
            memberData['project'] = response.business_data.new_employees[i].projects[0]['p_name'];
          }
          memberData['addedDate'] = response.business_data.new_employees[i].created_at;
          memberData['role'] = response.business_data.new_employees[i].emp_role;
          new_members.push(memberData);
          // console.log(new_members);
        }
        this.newMembers = new_members;
        // this.recentFiles = response.business_data.new_documents || [];
        for (let i = 0; i < response.business_data.new_documents.length; i++) {
          var fileData: { name: string; type: string; size: string; uploader: string; uploadDate: Date, project: string } = {
            name: '',
            type: '',
            size: '',
            uploader: '',
            uploadDate: new Date(),
            project: ''
          };
          fileData['name'] = response.business_data.new_documents[i].d_name;
          fileData['type'] = response.business_data.new_documents[i].d_type;
          fileData['size'] = response.business_data.new_documents[i].d_size_readable;
          fileData['uploader'] = response.business_data.new_documents[i].uploaded_by_name;
          fileData['uploadDate'] = response.business_data.new_documents[i].created_at;
          fileData['project'] = response.business_data.new_documents[i].project_name;
          new_docs.push(fileData);
        }
        this.recentFiles = new_docs
        this.storageUsed = response.total_storage_used || 0;
        this.storageRemains = response.business_data.storageRemains || 0;
        this.totalMembers = response.employee_count || 0;
        this.newMembersThisMonth = response.business_data.new_employees.length || 0;
        this.activeProjects = response.project_count || 0;
        for(let i=0; i<response.business_data.new_projects.length; i++){
          var projectData: {id: any, name: string; leader: string; duration: string; startDate: Date; status: string } = {
            name: '',
            leader: '',
            duration: '',
            startDate: new Date(),
            status: '',
            id: ''
          };
          projectData['name'] = response.business_data.new_projects[i].p_name;
          projectData['leader'] = response.business_data.new_projects[i].project_leader_name;
          projectData['duration'] = response.business_data.new_projects[i].p_duration;
          projectData['startDate'] = response.business_data.new_projects[i].start_date;
          projectData['status'] = response.business_data.new_projects[i].status;
          projectData['id'] = response.business_data.new_projects[i].p_id;
          new_projects.push(projectData);
          console.log(new_projects);
        }
        this.projects = new_projects;
        this.user = {
          name: response.business_data.user.emp_name,
          company: response.business_data.user.b_name,
          profileImage: response.business_data.user.profile_image
        }
        this.navItems = getNavigationItems(); // Update navigation items
    this.cdr.detectChanges(); // Trigger change detection
        if (!response.business_data.new_projects) {
          console.warn('No new projects available.');
        }
        if (!response.business_data.new_employees) {
          console.warn('No new employees available.');
        }
        if (!response.business_data.new_documents) {
          console.warn('No new documents available.');
        }
      } else {
        console.error('Invalid API response.');
      }
    }, error => {
      console.error('API error:', error);
      // navigate back to /login
      this.router.navigate(['/login']);
    });
  }
  user = {
    name: '',
    company: '',
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
      project: 'AI Chatbot Development'
    },
    {
      name: 'Project-Requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploader: 'Sarah Johnson',
      uploadDate: new Date('2024-07-20'),
      project: 'Mobile App Redesign'
    },
    {
      name: 'Project-Requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploader: 'Sarah Johnson',
      uploadDate: new Date('2024-06-20'),
      project: 'Cloud Migration'
    },
    {
      name: 'Project-Requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploader: 'Sarah Johnson',
      uploadDate: new Date('2024-04-20'),
      project: 'AI Chatbot Development'
    },
    {
      name: 'Project-Requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploader: 'Sarah Johnson',
      uploadDate: new Date('2024-05-20'),
      project: 'Mobile App Redesign'
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


  // Add this to sort files by date
  ngOnInit() {
    this.recentFiles.sort((a, b) => 
      b.uploadDate.getTime() - a.uploadDate.getTime()
    );
    this.getDataWithAuth();
  }
  onNavigate(route: string) {
    this.router.navigate([route]);
  }
  addProject() {
    // Implement project creation logic
  }

  addMember() {
    // Implement member addition logic
  }
  openProfile() {
    // Implement profile dialog
  }
  logout() {
    this.authService.clearUserData();
    this.router.navigate(['/logout']);
  }
  openFileDetails(file: any) {
    // Implement file detail view logic
  }
  
  handleFileMenu(event: {file: any, action: string}) {
    // Handle menu actions
    console.log('Menu action:', event.action, 'on file:', event.file);
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
  // In your DashboardNavComponent
openChat() {
  const dialogRef = this.dialog.open(ChatComponent, {
    data: {
      projects: this.projects // Pass the projects array from dashboard
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.chatbotService.setConfig(result);
      this.router.navigate(['/chat']);
    }
  });
}
handleProjectChat(project: any) {
  const dialogRef = this.dialog.open(ChatInitFormComponent, {
    data: {
      preselectedProject: project,
      projects: this.projects
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.chatbotService.setConfig(result);
      this.router.navigate(['/chat']);
    }
  });
}
}