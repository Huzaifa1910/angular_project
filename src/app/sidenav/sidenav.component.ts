// sidenav.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatProgressBarModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <div class="nav-content">
          <!-- Profile Header -->
          <div class="profile-header">
            <div class="profile-image-container">
              <img [src]="user.profileImage || 'default-profile.jpeg'" 
                   class="profile-image"
                   alt="Profile">
              <div class="profile-initial" *ngIf="isCollapsed">
                {{ user.name.charAt(0) }}
              </div>
            </div>
            <div class="profile-info"  *ngIf="user else: bufferbar"> 
              <h3 class="username">{{ user.name }}</h3>
              <p class="company">{{ user.company }}</p>
            </div>
            <ng-template #bufferbar>
              <mat-progress-bar mode="buffer"></mat-progress-bar>
              <mat-progress-bar mode="buffer"></mat-progress-bar>
            </ng-template>
          </div>

          <mat-nav-list>
            <mat-list-item 
              *ngFor="let item of navItems"
              [routerLink]="item.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{exact: true}"
              (click)="navigate.emit(item.route)">
              <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
              <span class="nav-label" matListItemTitle>{{ item.label }}</span>
            </mat-list-item>
          </mat-nav-list>

          <div class="bottom-section">
            <button mat-button (click)="redirectToProfile()">
              <mat-icon>person_outline</mat-icon>
              <span class="nav-label">Profile</span>
            </button>
            <button mat-button (click)="logout.emit()">
              <mat-icon>exit_to_app</mat-icon>
              <span class="nav-label">Logout</span>
            </button>
          </div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
    .sidenav-container {
      height: 100vh;
      width: 100%;
      --primary-color: #0C64B6;
      --text-color: #1A1A1A;
      --hover-bg: rgba(12, 100, 182, 0.08);
    }

    .sidenav {
      width: 250px;
      transition: width 0.3s ease;
      background: #FFFFFF;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    }

    .profile-header {
      padding: 24px 16px;
      border-bottom: 1px solid #F0F0F0;
      text-align: center;
    }
    mat-nav-list {
      padding-top: 0;
      flex-grow: 1;
      width: 90%;
    }

    mat-list-item {
      margin: 4px 8px;
      border-radius: 6px;
      transition: all 0.2s ease;
      color: var(--text-color);
      height: 48px !important;
      
      &.active {
        background-color: var(--primary-color);
        color: white !important;
        mat-icon {
          color: white !important;
        }
      }
      &.active .nav-label {
        color: white !important;
      }

      mat-icon {
        margin-right: 16px;
        transition: margin 0.3s ease;
      }
    }
    .profile-image-container {
      position: relative;
      margin: 0 auto;
      width: 60px;
      height: 60px;
    }

    .profile-image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--primary-color);
    }

    .profile-initial {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
    }

    .profile-info {
      margin-top: 16px;
    }

    .username {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-color);
    }

    .company {
      margin: 4px 0 0;
      font-size: 12px;
      color: #666;
    }

    

    mat-list-item {
      margin: 4px 8px;
      border-radius: 6px;
      transition: all 0.2s ease;
      color: var(--text-color);
      height: 48px !important;
      
      &.active {
        background-color: var(--primary-color);
        color: white !important;
        mat-icon {
          color: white !important;
        }
      }
      &.active .nav-label {
        color: white !important;
      }

      mat-icon {
        margin-right: 16px;
        transition: margin 0.3s ease;
      }
    }

    .nav-label {
      transition: opacity 0.2s ease;
      opacity: 1;
    }

    .bottom-section {
      padding: 16px;
      border-top: 1px solid #F0F0F0;
      display: flex;
      flex-direction: column;
      gap: 12px;

      button {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 12px 16px;
        border-radius: 6px;
        color: var(--text-color);
        
        mat-icon {
          margin-right: 16px;
        }
      }
    }
    .dashboard-content {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .stats-card {
    h2 {
      font-size: 2.2rem;
      margin: 16px 0;
      color: var(--primary-color);
    }

    .stats-status {
      color: #666;
      font-size: 0.9rem;
      margin-top: 8px;
    }
  }

  .projects-section {
    margin-top: 32px;
  }

  .section-title {
    color: var(--text-color);
    margin-bottom: 24px;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .project-card {
    &.ongoing {
      border-left: 4px solid #0C64B6;
    }
    &.delayed {
      border-left: 4px solid #ff4081;
    }
    &.completed {
      border-left: 4px solid #4CAF50;
    }

    .project-meta {
      margin-top: 16px;
      .milestone {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        margin-bottom: 12px;
      }
    }
  }

  .action-buttons {
    position: fixed;
    bottom: 32px;
    right: 32px;
    display: flex;
    gap: 16px;
  }

    .sidenav-container {
      height: 100vh;
      position: relative;
      --primary-color: #0C64B6;
      --text-color: #1A1A1A;
      --hover-bg: rgba(12, 100, 182, 0.08);
    }

    .sidenav {
      width: 250px;
      transition: width 0.3s ease;
      background: #FFFFFF;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    }

    .profile-header {
      padding: 24px 16px;
      border-bottom: 1px solid #F0F0F0;
      text-align: center;
      transition: all 0.3s ease;
    }

    .profile-image-container {
      position: relative;
      margin: 0 auto;
      width: 60px;
      height: 60px;
      transition: all 0.3s ease;
    }

    .profile-image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--primary-color);
      transition: all 0.3s ease;
    }

    .profile-initial {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
    }

    .profile-info {
      margin-top: 16px;
      transition: opacity 0.2s ease;
    }

    .username {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-color);
    }

    .company {
      margin: 4px 0 0;
      font-size: 12px;
      color: #666;
    }

    

    mat-list-item {
      margin: 4px 8px;
      border-radius: 6px;
      transition: all 0.2s ease;
      color: var(--text-color);
      height: 48px !important;
      
      &.active {
        background-color: var(--primary-color);
        color: white !important;
        mat-icon {
          color: white !important;
        }
      }
      &.active .nav-label {
        color: white !important;
      }

      mat-icon {
        margin-right: 16px;
        transition: margin 0.3s ease;
      }
    }

    .nav-label {
      transition: opacity 0.2s ease;
      opacity: 1;
    }

    .bottom-section {
      padding: 16px;
      border-top: 1px solid #F0F0F0;
      display: flex;
      flex-direction: column;
      gap: 12px;

      button {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 12px 16px;
        border-radius: 6px;
        color: var(--text-color);
        transition: all 0.2s ease;
        
        mat-icon {
          margin-right: 16px;
          transition: margin 0.3s ease;
        }
      }
    }

    .mat-sidenav-content {
      margin-left: 0 !important; /* Remove default margin for overlay mode */
    }
    .files-section {
    margin-top: 32px;
  }

  .file-item {
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: rgba(12, 100, 182, 0.04);
    }
  }

  .file-meta {
    color: #666;
    font-size: 0.9rem;
    display: flex;
    gap: 8px;
    align-items: center;
  }

  mat-icon[matListItemIcon] {
    color: var(--primary-color);
    margin-right: 16px;
  }
  /* Add members section styles */
  .members-section {
    margin-top: 32px;
  }

  .members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .member-card {
    mat-card-header {
      margin-bottom: 16px;
      
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--primary-color);
      }
    }

    .member-meta {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }
  }
  .nav-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }

  .spacer {
    flex: 1;
    min-height: 20px; /* Ensures minimum space */
  }

  .bottom-section {
    padding: 16px;
    border-top: 1px solid #F0F0F0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: auto; /* Pushes to bottom */
    background: #fff; /* Optional: solid background */
    position: relative;
    bottom: 0;
    z-index: 2;
  }

  /* Add these to ensure proper height containment */
  .mat-sidenav-container, .mat-sidenav {
    height: 100vh;
    box-sizing: border-box;
  }
    `
  ]
})
export class SideNavComponent {
  @Input() user: any;
  @Input() navItems: any[] = [];
  @Input() isCollapsed = false;
  
  @Output() navigate = new EventEmitter<string>();
  @Output() openProfile = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  constructor(private router: Router,  private authService: AuthService) {}

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }
}