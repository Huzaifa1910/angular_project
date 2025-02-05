// chat-init-form.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-init-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>Start Project Chat</h2>
    <mat-dialog-content>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>Your Name</mat-label>
          <input matInput [(ngModel)]="userName" name="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Select Project</mat-label>
          <mat-select [(ngModel)]="selectedProject" name="project" required>
            <mat-option *ngFor="let project of projects" [value]="project">
              {{ project.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>What do you need help with?</mat-label>
          <mat-select [(ngModel)]="helpType" name="helpType" required>
            <mat-option value="technical">Technical Support</mat-option>
            <mat-option value="billing">Billing Inquiry</mat-option>
            <mat-option value="general">General Questions</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" 
              [disabled]="!userName || !selectedProject || !helpType"
              (click)="onSubmit()">Start Chat</button>
    </mat-dialog-actions>
  `
})
export class ChatInitFormComponent {
  userName = '';
  selectedProject: any;
  helpType = '';
  projects: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChatInitFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projects = data.projects;
  }

  onSubmit() {
    this.dialogRef.close({
      userName: this.userName,
      project: this.selectedProject,
      helpType: this.helpType
    });
  }
}