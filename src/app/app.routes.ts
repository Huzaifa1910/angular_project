import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { DashboardNavComponent } from './dashboard/dashboard.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { FilepageComponent } from './filepage/filepage.component';
import { ChatComponent } from './chatscreen/chatscreen.component';
import { ChatGuard } from './chat.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
export const routes: Routes = [
    { path: 'login', component: LoginpageComponent },
    { path: 'signup', component: SignuppageComponent },
    { path: 'dashboard', component: DashboardNavComponent },
    { path: 'projects', component: ProjectPageComponent },
    { path: 'members', component: MemberPageComponent },
    { path: 'files', component: FilepageComponent },
    { path: 'logout', component: LoginpageComponent },
    {
      path: 'chat',
      component: ChatComponent,},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })


export class AppRoutingModule { }