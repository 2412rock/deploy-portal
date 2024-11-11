import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  // Import MatFormFieldModule for form fields


@Component({
  selector: 'app-setting-dialog',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule],
  templateUrl: './setting-dialog.component.html',
  styleUrl: './setting-dialog.component.css'
})
export class SettingDialogComponent {

  password: string = '';

  constructor(public dialogRef: MatDialogRef<SettingDialogComponent>) {}

  onSave(): void {
    localStorage.setItem('password', this.password);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
