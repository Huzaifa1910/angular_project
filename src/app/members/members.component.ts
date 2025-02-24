// members-list.component.ts
import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BackendApisService } from '../backend-apis.service';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule
  ],
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
              <div class="meta-item">
                <mat-icon>badge</mat-icon>
                <span>{{ member.role }}</span>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button (click)="openEditDialog(member)">Edit</button>
            <button mat-button color="warn" (click)="deleteMember(member)">Delete</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>

    <ng-template #editDialog let-data>
      <h2>Edit Member</h2>
      <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" [disabled]="true">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Project</mat-label>
          <mat-select formControlName="project">
            <mat-option *ngFor="let project of projects" [value]="project.id">{{ project.name }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Role</mat-label>
          <mat-select formControlName="role">
            <mat-option value="admin">Admin</mat-option>
            <mat-option value="member">Member</mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-button type="submit">Save</button>
        <button mat-button type="button" (click)="closeDialog()">Close</button>
      </form>
    </ng-template>
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
  @ViewChild('editDialog') editDialog: any;
  projects: { id: string, name: string }[] = [];
  editForm: any;
  selectedMember: any;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private backendapisservice: BackendApisService) {
    this.editForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      project: [''],
      role: ['']
    });
  }

  openEditDialog(member: any) {
    this.selectedMember = member;
    
    this.backendapisservice.get_projects_by_business().subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        if (response.success) {
          console.log('Projects fetched successfully');
          this.projects = response.projects.map((project: any) => ({
            id: project.p_id,
            name: project.p_name
          }));
          
        this.editForm.patchValue({
          name: member.name,
          project: this.projects.find(p => p.name === member.project)?.id || '',
          role: member.role
        });
        } else {
          console.error('Projects fetch failed:', response.message);
          alert('Projects fetch failed: ' + response.message);
        }
      },
      error: (error) => {
        console.error('API error:', error);
        alert('Projects fetch failed: ' + error.error.message);
      }
    });
    console.log(member);
    const dialogRef = this.dialog.open(this.editDialog, {
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result here
      }
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      let employeeId = this.selectedMember.emp_id;
      console.log(employeeId);
      console.log(this.editForm.value);
      this.backendapisservice.edit_employee(employeeId, this.editForm.value).subscribe({
        next: (response: any) => {
          console.log('API response:', response);
          if (response.success) {
            console.log('Employee updated successfully');
            this.dialog.closeAll();
          } else {
            console.error('Employee update failed:', response.message);
            alert('Employee update failed: ' + response.message);
          }
        },
        error: (error) => {
          console.error('API error:', error);
          alert('Employee update failed: ' + error.error.message);
        }
      });
    }
  }

  deleteMember(member: any) {
    if (confirm(`Are you sure you want to delete ${member.name}?`)) {
      this.backendapisservice.delete_employee(member.emp_id).subscribe({
        next: (response: any) => {
          console.log('API response:', response);
          if (response.success) {
            console.log('Employee deleted successfully');
            this.members = this.members.filter(m => m.emp_id !== member.emp_id);
          } else {
            console.error('Employee deletion failed:', response.message);
            alert('Employee deletion failed: ' + response.message);
          }
        },
        error: (error) => {
          console.error('API error:', error);
          alert('Employee deletion failed: ' + error.error.message);
        }
      });
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}