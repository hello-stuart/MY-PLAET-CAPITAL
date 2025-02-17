import { Component } from '@angular/core';
import { SiteLayoutComponent } from "./components/site-layout/site-layout.component";



@Component({
  selector: 'app-root',
  imports: [SiteLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'HOLDING-WEBSITE';



}
