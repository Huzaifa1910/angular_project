// file-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatCardModule],
  template: `
    <div class="files-section">
      <h2 class="section-title">{{ title }}</h2>
      <mat-card>
        <mat-list>
          <mat-list-item 
            *ngFor="let file of files" 
            class="file-item"
            (click)="fileSelected.emit(file)"
          >
            <mat-icon matListItemIcon>
              {{ getFileIcon(file.type) }}
            </mat-icon>
            <div matListItemTitle>{{ file.name }}</div>
            <div matListItemLine class="file-meta">
              <span>{{ file.uploader }} • {{ file.size }} • {{ file.uploadDate | date:'mediumDate' }} • {{ file.project }}</span>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card>
    </div>
  `,
  styles: [`
    .files-section {
      margin-top: 32px;
    }

    .section-title {
      color: var(--text-color);
      margin-bottom: 24px;
    }

    .file-item {
      cursor: pointer;
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
  `]
})
export class FileListComponent {
  @Input() files: any[] = [];
  @Input() title: string = 'Recent Files';
  @Output() fileSelected = new EventEmitter<any>();
  @Output() menuAction = new EventEmitter<{file: any, action: string}>();

  getFileIcon(fileType: string): string {
    const iconMap: {[key: string]: string} = {
      'pdf': 'picture_as_pdf',
      'folder': 'folder',
      'image': 'insert_photo',
      'doc': 'description',
      'xls': 'table_chart',
      'default': 'insert_drive_file'
    };
    return iconMap[fileType] || iconMap['default'];
  }

  handleMenuClick(event: MouseEvent, file: any) {
    event.stopPropagation();
    this.menuAction.emit({file, action: 'menu-click'});
  }
}