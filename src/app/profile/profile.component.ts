import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { navItems } from '../../main';
import { SideNavComponent } from '../sidenav/sidenav.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailComponent } from '../project-details/project-details.component';
import { ProjectsListComponent } from "../projects/projects.component";
import { BackendApisService } from '../backend-apis.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    SideNavComponent,
    MatIconModule,
    ProjectDetailComponent,
    ProjectsListComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
sessionStorage: any;
  constructor(private router: Router, private dialog: MatDialog, private backendapisservice : BackendApisService) {}
  get_profile_details(){
    this.backendapisservice.get_profile_details().subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        if (response.success) {
          console.log('Profile details fetched');
          // consle data that should be received from the API
          let new_projects = []
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
            console.log(new_projects);
          }
          this.projects = new_projects;
          this.user = {
            name: response.user_details.emp_name,
            company: response.user_details.b_name,
            profileImage: ''
          }
          this.data.user = {
            name: response.user_details.emp_name,
            role: response.user_details.emp_role,
            company: response.user_details.b_name,
            email: response.user_details.emp_email,
            project: response.user_details.p_name,
            profilePicture: 'default-profile.jpeg'
          }
        }
      }
    });  
  }
  ngOnInit() {
    this.get_profile_details();
  }
  data = {
    user: {
      name: 'John Doe',
      role: 'Member',
      company: 'Knowledge Bridge',
      email: 'john.doe@example.com',
      project: 'Mobile App Design',
      profilePicture: 'default-profile.jpeg' // Placeholder image path
    }
  };
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
  ];
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
  openProfile() {
    // Implement profile dialog
  }
  user = {
    name: 'John Doe',
    company: 'Knowledge Bridge Corporation',
    profileImage: ''
  };
  navItems = navItems;
  logout() {
    this.router.navigate(['/logout']);
  }
  onNavigate(route: string) {
    this.router.navigate([route]);
  }
  onChangePicture(): void {
    // Logic to change profile picture
    console.log('Change profile picture');
  }
}
