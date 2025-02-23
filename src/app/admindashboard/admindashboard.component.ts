import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ProjectDetailComponent } from '../project-details/project-details.component';
import { ProjectsListComponent } from '../projects/projects.component';
import { MembersListComponent } from '../members/members.component';
import { FileListComponent } from '../files/files.component';
import { SideNavComponent } from '../sidenav/sidenav.component';
import { Router } from '@angular/router';
import { ChatComponent } from '../chatscreen/chatscreen.component';
import { ChatbotService } from '../chatbot.service';
import { ChatGuard } from '../chat.guard';
import { navItems } from '../../main';
import { ChatInitFormComponent } from '../chatinitformcomponent/chatinitformcomponent.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { BackendApisService } from '../backend-apis.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
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
    SideNavComponent,
    MatDialogContent,
    MatInput,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
})
export class AdmindashboardComponent implements OnInit{
   @ViewChild('addProjectDialog') addProjectDialog!: TemplateRef<any>;
  @ViewChild('addMemberDialog') addMemberDialog!: TemplateRef<any>;
  addProjectForm!: FormGroup;
  addMemberForm!: FormGroup;
  dialogRef!: MatDialogRef<any>;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isCollapsed = false;
  selectedRoute = '/dashboard';

  constructor(private fb: FormBuilder, private backendapiservice: BackendApisService ,private dialog: MatDialog, private router: Router, private chatbotService: ChatbotService) {
  }
  getDataWithAuth() {
    this.backendapiservice.getDataWithAuth('/get_dashboard_data').subscribe((response: any) => {
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
          memberData['project'] = response.business_data.new_employees[i].projects[0]['p_name'];
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
    name: 'John Doe',
    company: 'Knowledge Bridge Corporation',
    profileImage: ''
  };
  storageUsed = 0;
  storageRemains = 0;
  totalMembers = 24;
  newMembersThisMonth = 3;
  activeProjects = 15;
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
  projectLeaders = [];
  projectOptions = [];
  get_all_projects(){
    this.backendapiservice.get_all_projects().subscribe((response: any) => {
      console.log('API response:', response);
      if (response && response.projects) {
        this.projectOptions = response.projects;
        console.log(this.projectOptions);
        if (!response.projects) {
          console.warn('No projects available.');
        }
      } else {
        console.error('Invalid API response.');
      }
    }, error => {
      console.error('API error:', error);
    });
  }
  newMembers = [
    {
      name: 'Emma Wilson',
      profileImage: '',
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
  addProject() {
    if (this.addProjectForm) {
      this.addProjectForm.reset();
    }
    this.dialog.open(this.addProjectDialog);
    this.backendapiservice.get_all_leaders().subscribe((response: any) => {
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
  addMember() {
    if (this.addMemberForm) {
      this.addMemberForm.reset();
    }
    this.dialog.open(this.addMemberDialog);
    this.get_all_projects();
  }
  // Add this to sort files by date
  ngOnInit() {
    this.getDataWithAuth();
    this.addProjectForm = this.fb.group({

      projectName: ['', Validators.required],

      projectDescription: ['', Validators.required],

      projectDuration: ['', Validators.required],

      projectLeader: ['', Validators.required],

      projectStartDate: ['', Validators.required],

      projectStatus: ['', Validators.required]

    });

    this.addMemberForm = this.fb.group({
      
      memberName: ['', Validators.required],
      
      memberEmail: ['', Validators.required],

      memberRole: ['', Validators.required],

      projectName: ['']

    });
    
    this.getDataWithAuth();

  }
  
  onNavigate(route: string) {
    this.router.navigate([route]);
  }
  createProject() {
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
  openProjectDetails(project: any): void {
    // You would typically fetch real data here
    this.backendapiservice.getProjectEmployees(project.id).subscribe((response: any) => {
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
closeModal() {
  this.dialog.closeAll();
}
closeAddProjectDialog(): void {
  this.dialog.closeAll();
}
closeAddMemberDialog(): void {
  this.dialog.closeAll();
}
submitAddProject(): void {
  if (this.addProjectForm.value.projectName && this.addProjectForm.value.projectDescription && this.addProjectForm.value.projectDuration && this.addProjectForm.value.projectLeader && this.addProjectForm.value.projectStartDate && this.addProjectForm.value.projectStatus) {
    const newProject = this.addProjectForm.value;
    console.log(newProject);
    this.backendapiservice.add_project(newProject).subscribe((response: any) => {
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
submitAddMember(): void {
  if (this.addMemberForm.value.memberName && this.addMemberForm.value.memberEmail && this.addMemberForm.value.memberRole) {
    let newMember = this.addMemberForm.value;
    newMember['password'] = '12345678'
    // console.log(newMember);
    let member_option = {
      'name': newMember.memberName,
      'profileImage': '', // Add this line
      'addedBy': 'Huzaifa Ghori',
      'project': newMember.projectName,
      'addedDate': new Date(),
    }
    this.newMembers.push(member_option);
    // this.closeAddProjectDialog();
    this.backendapiservice.add_employee(newMember).subscribe((response: any) => {
      console.log('API response:', response);
      if (response.success) {
        console.log('Member added successfully');
        console.log(response);
        // this.newMembers.push(newMember);
        this.closeAddMemberDialog();
      } else {
        console.error('Failed to add member:', response.message);
        this.closeAddMemberDialog();
      }
    }, error => {
      console.error('API error:', error);
      alert('An error occurred while adding the member.');
    });
  }
  else{
    console.log("invalid form data");
    // this.closeAddProjectDialog();
    // refresh the page
  }
}
}