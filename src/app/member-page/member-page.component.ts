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
import { ProjectDetailComponent } from '../project-details/project-details.component';
import { ProjectsListComponent } from '../projects/projects.component';
import { MembersListComponent } from '../members/members.component';
import { FileListComponent } from '../files/files.component';
import { SideNavComponent } from '../sidenav/sidenav.component';
import { Router } from '@angular/router';
import { navItems } from '../../main';
import { BackendApisService } from '../backend-apis.service';



import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-member-page',
  imports: [MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, CommonModule, RouterModule, MatCardModule, MatProgressBarModule, MatMenuModule, MatSidenav, ProjectDetailComponent, ProjectsListComponent, MembersListComponent, FileListComponent, SideNavComponent,
    MatNativeDateModule, ChatComponent, MatDialogContent, FormsModule, ReactiveFormsModule, ChatInitFormComponent, MatInput, MatInputModule, MatSelectModule, MatDatepickerModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.css'
})
export class MemberPageComponent implements OnInit {
  @ViewChild('addMemberDialog') addMemberDialog!: TemplateRef<any>;
  addMemberForm!: FormGroup;
  projectOptions = [];
  user = {
    name: 'John Doe',
    company: 'Knowledge Bridge Corporation',
    profileImage: ''
  };
  get_all_projects(){
    this.backendapisService.get_all_projects().subscribe((response: any) => {
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
    this.addMemberForm = this.fb.group({
      
      memberName: ['', Validators.required],
      
      memberEmail: ['', Validators.required],

      memberRole: ['', Validators.required],

      projectName: ['']

    });
    this.get_employees_by_role();
  }
  onNavigate(route: string) {
    this.router.navigate([route]);
  }
  addProject() {
    // Implement project creation logic
  }

  addMember() {
    if (this.addMemberForm) {
      this.addMemberForm.reset();
    }
    this.dialog.open(this.addMemberDialog);
    this.get_all_projects();
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
  constructor(private dialog: MatDialog, private router: Router, private backendapisService: BackendApisService, private fb: FormBuilder) { 

  }

  get_employees_by_role(){
    this.backendapisService.get_employees_by_role().subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        console.log(response.employees)
        if (response.success) {
          var new_members = [];
          for(let i=0; i<response.employees.length; i++){
            var memberData: { name: string; profileImage: string; addedBy: string; project: string; addedDate: Date, role: string } = {
              name: '',
              profileImage: '',
              addedBy: '',
              project: '',
              role: '',
              addedDate: new Date()
            };
            memberData['name'] = response.employees[i].emp_name;
            memberData['profileImage'] = response.employees[i].emp_profile_image;
            memberData['addedBy'] = response.employees[i].added_by_name;
            memberData['project'] = response.employees[i].p_name;
            memberData['addedDate'] = response.employees[i].created_at;
            memberData['role'] = response.employees[i].emp_role;
            new_members.push(memberData);
            // console.log(new_members);
          }
          this.newMembers = new_members;
          this.user = {
            name: response.user.emp_name,
            company: response.user.b_name,
            profileImage: ''
            
          }
          console.log('Employees:', response.employees);
          // this.newMembers = response.employees;
        } else {
          console.error('Failed to fetch employees:', response.message);
          alert('Failed to fetch employees: ' + response.message);
        }
      },
      error: (error) => {
        console.error('API error:', error);
        alert('Failed to fetch employees: ' + error.message);
      }
    });
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
  closeAddMemberDialog(): void {
    this.dialog.closeAll();
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
      this.backendapisService.add_employee(newMember).subscribe((response: any) => {
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
