import { Component, Inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BackendApisService } from '../backend-apis.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  template: `
    <div class="project-dialog">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ data.project.name }}</mat-card-title>
          <mat-card-subtitle>
            Started {{ data.project.startDate | date:'mediumDate' }}
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="project-meta">
            <div class="meta-item">
              <mat-icon>leaderboard</mat-icon>
              <span>Status: {{ data.project.status | titlecase }}</span>
            </div>
            <div class="meta-item">
              <mat-icon>person</mat-icon>
              <span>Project Lead: {{ data.project.leader }}</span>
            </div>
          </div>

          <div class="team-section">
            <h3>Team Members</h3>
            <div class="team-grid">
              <div *ngFor="let member of data.team" class="team-member">
                <img [src]="member.profileImage || 'default-profile.jpeg'" 
                     alt="{{ member.name }}" class="member-avatar">
                <span class="member-name">{{ member.name }}</span>
                <span class="member-role">{{ member.role }}</span>
              </div>
            </div>
          </div>

          <div class="documents-section">
            <h3>Project Documents</h3>
            <mat-list>
              <mat-list-item *ngFor="let doc of data.documents" class="document-item">
                <mat-icon matListItemIcon>{{ getFileIcon(doc.type) }}</mat-icon>
                <div matListItemTitle>{{ doc.name }}</div>
                <div matListItemLine class="document-meta">
                  Uploaded {{ doc.uploadDate | date:'mediumDate' }} by {{ doc.uploadedBy }}
                </div>
              </mat-list-item>
              <mat-list-item *ngFor="let doc of uploadedDocuments" class="document-item">
                <mat-icon matListItemIcon>{{ getFileIcon(doc.type) }}</mat-icon>
                <div matListItemTitle>{{ doc.name }}</div>
                <div matListItemLine class="document-meta">
                  Uploaded {{ doc.uploadDate | date:'mediumDate' }} by {{ doc.uploadedBy }}
                </div>
                <button mat-icon-button (click)="removeDocument(doc)">
                  <mat-icon>delete</mat-icon>
                </button>
              </mat-list-item>
            </mat-list>
            <div class="upload-container" 
                 [class.dragover]="isDragOver" 
                 (click)="fileInput.click()"
                 (dragover)="onDragOver($event)"
                 (dragleave)="onDragLeave($event)"
                 (drop)="onDrop($event)">
              <input type="file" #fileInput (change)="onFileSelected($event)" multiple hidden>
              <p>Drag and drop files here, or click to select files</p>
            </div>
            <button mat-button (click)="uploadFiles()">Upload</button>
          </div>
        </mat-card-content>

        <mat-card-actions align="end">
          <button mat-button (click)="onClose()">Close</button>
          <button mat-button (click)="onChat()">Chat</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .project-dialog {
      max-width: 800px;
      width: 100%;
      height: 80%;
      margin: 0 auto;
      
      mat-card {
        padding: 24px;
      }
    }

    .project-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: #f5f5f5;
        border-radius: 8px;

        mat-icon {
          color: #0C64B6;
        }
      }
    }

    .team-section {
      margin: 24px 0;

      h3 {
        color: #0C64B6;
        margin-bottom: 16px;
      }

      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
      }

      .team-member {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        border: 1px solid #eee;
        border-radius: 8px;
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
        }

        .member-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-bottom: 8px;
          border: 2px solid #0C64B6;
        }

        .member-name {
          font-weight: 500;
          text-align: center;
        }

        .member-role {
          color: #666;
          font-size: 0.9rem;
        }
      }
    }

    .documents-section {
      margin-top: 24px;
      h3 {
        color: #0C64B6;
        margin-bottom: 16px;
      }
      mat-list {
        height: 300px;
        overflow-y: auto;
      }
      .document-item {
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
      }

      .document-meta {
        color: #666;
        font-size: 0.8rem;
      }
    }

    .upload-container {
      border: 2px dashed #0C64B6;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .upload-container.dragover {
      background-color: rgba(12, 100, 182, 0.1);
    }
  `]
})
export class ProjectDetailComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedDocuments: any[] = [];
  isDragOver = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private backendApisService: BackendApisService) {}
  
  getFileIcon(type: string): string {
    const icons: { [key: string]: string } = {
      pdf: 'picture_as_pdf',
      doc: 'description',
      xls: 'table_chart',
      image: 'insert_photo',
      folder: 'folder',
      default: 'insert_drive_file'
    };
    return icons[type] || icons['default'];
  }

  onClose(): void {
    this.dialog.closeAll();
  }

  onChat(): void {
    const projectName = this.data.project.name;
    this.dialog.closeAll();
    window.location.href = `/chat?projectName=${projectName}`;
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const files: File[] = Array.from(event.dataTransfer?.files || []);
    this.handleFiles(files);
  }

  onFileSelected(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.handleFiles(files);
    this.fileInput.nativeElement.value = ''; // Reset the file input value
  }

  handleFiles(files: File[]): void {
    files.forEach(file => {
      this.uploadedDocuments.push({
        name: file.name,
        type: file.type.split('/')[1],
        uploadDate: new Date(),
        uploadedBy: 'You',
        file: file
      });
    });
  }

  removeDocument(doc: any): void {
    const index = this.uploadedDocuments.indexOf(doc);
    if (index > -1) {
      this.uploadedDocuments.splice(index, 1);
    }
  }

  uploadFiles(): void {
    const files = this.uploadedDocuments.map(doc => doc.file);
    const additionalData = {
      projectId: this.data.project.id,
      description: 'Project documents'
    };
    this.backendApisService.uploadDocuments(files, additionalData).subscribe(response => {
      console.log('Files uploaded successfully', response);
    }, error => {
      console.error('Error uploading files', error);
    });
  }
}