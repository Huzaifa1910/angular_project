// projects-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="projects-section">
      <h2 class="section-title">{{ title }}</h2>
      <div class="projects-grid">
        <mat-card 
          *ngFor="let project of projects" 
          class="project-card" 
          [class]="project.status.replace(' ', '')"
          (click)="projectSelected.emit(project)"
        >
          <mat-card-header>
            <mat-card-title>{{ project.name }}</mat-card-title>
            <mat-card-subtitle>
              Leader: {{ project.leader }} | Duration: {{ project.duration }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="project-meta">
              <div class="milestone">
                <mat-icon>event</mat-icon>
                {{ project.startDate | date }}
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
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
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-3px);
      }

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
  `]
})
export class ProjectsListComponent {
  @Input() projects: any[] = [];
  @Input() title: string = 'Projects';
  @Output() projectSelected = new EventEmitter<any>();
}