import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { DashboardNavComponent } from './dashboard/dashboard.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { FilepageComponent } from './filepage/filepage.component';
import { ChatComponent } from './chatscreen/chatscreen.component';
import { MemberdashboardComponent } from './memberdashboard/memberdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ChatGuard } from './chat.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsListComponent } from './projects/projects.component';
import { MembersListComponent } from './members/members.component';
import { FileListComponent } from './files/files.component';

export const routes: Routes = [
    { path: 'login', component: LoginpageComponent },
    { path: 'signup', component: SignuppageComponent },
    { path: 'dashboard', component: DashboardNavComponent },
    { path: 'projects', component: ProjectPageComponent },
    { path: 'members', component: MemberPageComponent },
    { path: 'files', component: FilepageComponent },
    { path: 'logout', component: LoginpageComponent },
    { path: 'member-dashboard', component: MemberdashboardComponent },
    { path: 'admin-dashboard', component: AdmindashboardComponent },
    { path: 'profile', component: ProfileComponent},
    {
      path: 'chat',
      component: ChatComponent,},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
  ];

// export const appRoutes: Routes = [
//   { path: 'admin-dashboard', component: AdmindashboardComponent },
//   { path: 'projects', component: ProjectsListComponent },
//   { path: 'members', component: MembersComponent },
//   { path: 'files', component: FilesComponent },
//   { path: 'chat', component: ChatComponent },
//   { path: 'member-dashboard', component: MemberDashboardComponent },
//   { path: '', component: GuestComponent }
// ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })


export class AppRoutingModule { }