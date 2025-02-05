// members-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="members-section">
      <h2 class="section-title">{{ title }}</h2>
      <div class="members-grid">
        <mat-card *ngFor="let member of members" class="member-card">
          <mat-card-header>
            <img mat-card-avatar 
                 [src]="member.profileImage || 'default-profile.jpeg'" 
                 alt="{{ member.name }}">
            <mat-card-title>{{ member.name }}</mat-card-title>
            <mat-card-subtitle>Added {{ member.addedDate | date:'mediumDate' }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="member-meta">
              <div class="meta-item">
                <mat-icon>person_add</mat-icon>
                <span>{{ member.addedBy }}</span>
              </div>
              <div class="meta-item">
                <mat-icon>work</mat-icon>
                <span>{{ member.project }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .members-section {
      margin-top: 32px;
    }

    .section-title {
      color: var(--text-color);
      margin-bottom: 24px;
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
  `]
})
export class MembersListComponent {
  @Input() members: any[] = [];
  @Input() title: string = 'Team Members';
}