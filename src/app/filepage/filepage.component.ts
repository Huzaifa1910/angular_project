import { Component, ChangeDetectorRef } from '@angular/core';
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
import { navItems, getNavigationItems} from '../../main';
import { BackendApisService } from '../backend-apis.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-filepage',
  imports: [ MatCardModule,
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
    SideNavComponent],
  templateUrl: './filepage.component.html',
  styleUrl: './filepage.component.css'
})
export class FilepageComponent {
  constructor(private dialog: MatDialog, private router: Router, private backendApisService: BackendApisService, private cdr: ChangeDetectorRef,  private authService: AuthService) {
    console.log('File page loaded');

  }

  get_documents(){
    this.backendApisService.get_documents().subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        if (response.success) {
          var documents = [];
          for (let i = 0; i < response.documents.length; i++) {
            var fileData: { name: string; type: string; size: string; uploader: string; uploadDate: Date, project: string } = {
              name: '',
              type: '',
              size: '',
              uploader: '',
              uploadDate: new Date(),
              project: ''
            };
            fileData['name'] = response.documents[i].d_name;
            fileData['type'] = response.documents[i].d_type;
            fileData['size'] = response.documents[i].d_size_readable;
            fileData['uploader'] = response.documents[i].uploaded_by_name;
            fileData['uploadDate'] = response.documents[i].created_at;
            fileData['project'] = response.documents[i].project_name;
            documents.push(fileData);
          }
          this.recentFiles = documents;
          this.user = {
            name: response.user.emp_name,
            company: response.user.b_name,
            profileImage: ''
          }
          this.navItems = getNavigationItems(); // Update navigation items
          this.cdr.detectChanges(); // Trigger change detection
        }
      }});
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
    this.get_documents()
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
}
