import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  deployBackend: boolean = false;
  deploySql: boolean = false;
  deployBot: boolean = false;
  deployMigrations: boolean = false;
  
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Assign values based on passed data
    console.log("data")
    console.log(data)
    this.deployBackend = data.deployBackend;
    this.deploySql = data.deploySql;
    this.deployBot = data.deployBot;
    this.deployMigrations = data.deployMigrations;
  }

  confirmDeployment(): void {
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
