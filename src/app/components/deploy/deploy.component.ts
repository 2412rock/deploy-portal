import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DeployReq, HttpService } from '../../services/http.service';
import { firstValueFrom } from 'rxjs';
import { LocalstorageService } from '../../services/localstorage.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-deploy',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './deploy.component.html',
  styleUrl: './deploy.component.css'
})
export class DeployComponent {

  isLoading = false;
  error = false;
  errorAt: Error;
  dialog = inject(MatDialog);
  public targetServer: string = "local";

  options = {
    deployBackend: false,
    deploySQL: false,
    deployMigrations: false,
    deployBot: false,
  };

  constructor(private httpService: HttpService, private localStorageService: LocalstorageService) {

  }


  openConfirmationDialog() {
    this.error = false;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        deployBackend: this.options.deployBackend,
        deploySql: this.options.deploySQL,
        deployBot: this.options.deployBot,
        deployMigrations: this.options.deployMigrations
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log('Deployment Confirmed!');
        this.isLoading = true;
        let req = new DeployReq();
        req.deploy_backend = this.options.deployBackend;
        req.deploy_bot = this.options.deployBot;
        if (this.targetServer === "local") {
          console.log("Deploy local")
          try {
            let response = await firstValueFrom(this.httpService.deployLocalServer(req));
            console.log(response)
            if (response != "ok") {
              console.log("Deploy local error")
              this.error = true;
              this.errorAt = new Error();
              this.errorAt.errorAt = "Deploy local server error";
              this.isLoading = false;
              return;
            }
          }
          catch (error) {
            this.isLoading = false;
            console.log("Deploy local error")
            this.error = true;
            this.errorAt = new Error();
            this.errorAt.errorAt = "Deploy local server http error";
            this.isLoading = false;
          }
          this.isLoading = false;

        }
        else {
          console.log("Deploy local")
          try {
            let response = await firstValueFrom(this.httpService.deployGCPServer(req));
            console.log(response)
            if (response != "ok") {
              console.log("Deploy local error")
              this.error = true;
              this.errorAt = new Error();
              this.errorAt.errorAt = "Deploy local server error";
              this.isLoading = false;
              return;
            }
          }
          catch (error) {
            this.isLoading = false;
            console.log("Deploy local error")
            this.error = true;
            this.errorAt = new Error();
            this.errorAt.errorAt = "Deploy local server http error";
            this.isLoading = false;
          }
          this.isLoading = false;
        }

        if (this.options.deployMigrations) {
          try {
            let response = await firstValueFrom(this.httpService.deployGCPServer(req))
            if (response != "ok") {
              this.error = true;
              this.errorAt = new Error();
              this.errorAt.errorAt = "Deploy sql migrations error";
            }
          }
          catch (error) {
            this.error = true;
            this.errorAt = new Error();
            this.errorAt.errorAt = "Deploy sql migrations http error";
          }
          this.isLoading = false;
        }
        // Proceed with the deployment
      } else {
        console.log('Deployment Cancelled');
      }
    });
  }

  confirmDeployment() {
    this.isLoading = true;
    this.dialog.closeAll();

    // Mock deployment process
    setTimeout(() => {
      console.log('Deployment process:', this.options);
      this.isLoading = false;
      alert('Deployment completed!');
    }, 3000); // Simulating a 3-second deployment time
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingDialogComponent);
  }
}

export class Error {
  public errorAt = ""
}
