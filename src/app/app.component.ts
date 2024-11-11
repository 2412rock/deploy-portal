import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeployComponent } from './components/deploy/deploy.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeployComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'deploy-portal';
}
