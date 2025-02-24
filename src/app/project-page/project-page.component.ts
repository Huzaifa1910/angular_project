import { Component, OnInit, TemplateRef, ViewChild, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
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
import { navItems, getNavigationItems } from '../../main';
import { BackendApisService } from '../backend-apis.service';
import { AuthService } from '../auth.service';




import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ChatComponent } from '../chatscreen/chatscreen.component';
import { ChatbotService } from '../chatbot.service';
import { MatDialogContent } from '@angular/material/dialog';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatInitFormComponent } from '../chatinitformcomponent/chatinitformcomponent.component';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-project-page',
  imports: [ MatSidenavModule,
     MatListModule, 
     MatButtonModule, 
     MatIconModule, 
     RouterModule, MatCardModule, 
     MatProgressBarModule, MatMenuModule, 
     ProjectDetailComponent, ProjectsListComponent, 
     MembersListComponent, FileListComponent, 
     SideNavComponent, CommonModule, MatNativeDateModule, 
     FormsModule, ReactiveFormsModule, MatInputModule, 
     MatSelectModule, MatDatepickerModule,
     MatDialogContent, MatInput,
      
     ],
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
export class ProjectPageComponent implements OnInit{
  @ViewChild('addProjectDialog') addProjectDialog!: TemplateRef<any>;
  @Output() chatRequested = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private router: Router, private backendApisService: BackendApisService, private fb: FormBuilder, private  cdr: ChangeDetectorRef,  private authService: AuthService) {
    console.log('Project page loaded');
  }
  userRole: string = '';
  addProjectForm!: FormGroup;
  projectLeaders = [];
  projectOptions = [];
  get_projects_by_business(){
    // Implement project fetching logic
    this.backendApisService.get_projects_by_business().subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        if (response.success) {
          var new_projects = [];
          console.log('Projects fetched successfully');
          console.log(response);
          for(let i=0; i<response.projects.length; i++){
            var projectData: {id: any, name: string; leader: string; duration: string; startDate: Date; status: string } = {
              name: '',
              leader: '',
              duration: '',
              startDate: new Date(),
              status: '',
              id: ''
            };
            projectData['name'] = response.projects[i].p_name;
            projectData['leader'] = response.projects[i].project_leader_name;
            projectData['duration'] = response.projects[i].p_duration;
            projectData['startDate'] = response.projects[i].start_date;
            projectData['status'] = response.projects[i].status;
            projectData['id'] = response.projects[i].p_id;
            new_projects.push(projectData);
          }

          this.projects = new_projects;
          this.user = {
            name: response.user.emp_name,
            company: response.user.b_name,
            profileImage: ''
          }
          this.navItems = getNavigationItems(); // Update navigation items
    this.cdr.detectChanges(); // Trigger change detection
          this.userRole = response.user.emp_role;
        } else {
          console.error('Failed to fetch projects');
        }
      }
    });

  }
  submitAddProject(): void {
    if (this.addProjectForm.value.projectName && this.addProjectForm.value.projectDescription && this.addProjectForm.value.projectDuration && this.addProjectForm.value.projectLeader && this.addProjectForm.value.projectStartDate && this.addProjectForm.value.projectStatus) {
      const newProject = this.addProjectForm.value;
      console.log(newProject);
      this.backendApisService.add_project(newProject).subscribe((response: any) => {
        console.log('API response:', response);
        if (response.success) {
          console.log('Project added successfully');
          let newProjectDetail = {
            name: newProject.projectName,
            leader: newProject.projectLeader,
            duration: newProject.projectDuration,
            startDate: newProject.projectStartDate,
            status: newProject.projectStatus
          }
          this.projects.push(newProjectDetail);
          this.closeAddProjectDialog();
        } else {
          console.error('Failed to add project:', response.message);
          this.closeAddProjectDialog();
        }
      }, error => {
        console.error('API error:', error);
        alert('An error occurred while adding the project.');
      
      }
      );
      this.closeAddProjectDialog();
    } else {
      console.log('Invalid form data');
      // this.closeAddProjectDialog();
    }
  }
  ngOnInit() {
    this.addProjectForm = this.fb.group({

      projectName: ['', Validators.required],

      projectDescription: ['', Validators.required],

      projectDuration: ['', Validators.required],

      projectLeader: ['', Validators.required],

      projectStartDate: ['', Validators.required],

      projectStatus: ['', Validators.required]

    });
    this.get_projects_by_business();
  }
  addProject() {
    if (this.addProjectForm) {
      this.addProjectForm.reset();
    }
    this.dialog.open(this.addProjectDialog);
    this.backendApisService.get_all_leaders().subscribe((response: any) => {
      console.log('API response:', response);
      if (response && response.team_leads) {
        this.projectLeaders = response.team_leads;
        console.log(this.projectLeaders);
        if (!response.leaders) {
          console.warn('No leaders available.');
        }
      } else {
        console.error('Invalid API response.');
      }
    }, error => {
      console.error('API error:', error);
    });
  }
  openChat(project: any) {
    this.chatRequested.emit(project);
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
    closeAddProjectDialog(): void {
      this.dialog.closeAll();
    }
    openProjectDetails(project: any): void {
      // You would typically fetch real data here
      this.backendApisService.getProjectEmployees(project.id).subscribe((response: any) => {
        console.log('API response:', response);
        if (response && response.employees) {
          let team_members: { name: any; role: any; }[] = []
          let project_docs: { name: any; type: any; size: any; uploader: any; uploadDate: any; }[] = []
          response.employees.forEach((element: any) => {
            let member = {
              'name': element.emp_name,
              'role': element.emp_role,
            }
            team_members.push(member);
          });
          response.documents.forEach((element: any) => {
            let file = {
              'name': element.d_name,
              'type': element.d_type,
              'size': element.d_size,
              'uploader': element.uploaded_by_name,
              'uploadDate': element.created_at
            }
            project_docs.push(file);
          }
          );
          const dialogData = {
            project: project,
            team: team_members,
            documents: project_docs // Example filter
          };
          this.dialog.open(ProjectDetailComponent, {
            width: '90%',
            maxWidth: '800px',
            data: dialogData
          });
        } else {
          console.error('Invalid API response.');
        }
      }
      , error => {
        console.error('API error:', error);
      }
      );
  
      // const dialogData = {
      //   project: project,
      //   team: [
      //     { name: 'Sarah Johnson', role: 'Project Lead', profileImage: '' },
      //     { name: 'Michael Chen', role: 'Developer', profileImage: '' },
      //     { name: 'Emma Wilson', role: 'Designer', profileImage: '' }
      //   ],
      //   documents: this.recentFiles.filter(f => f.type === 'pdf') // Example filter
      // };
    
      // this.dialog.open(ProjectDetailComponent, {
      //   width: '90%',
      //   maxWidth: '800px',
      //   data: dialogData
      // });
    }
}
