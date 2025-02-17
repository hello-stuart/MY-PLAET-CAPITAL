import { Component, importProvidersFrom } from '@angular/core';

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'HOLDING-WEBSITE';
  constructor(private http: HttpClient) { }
  greeting: string = '';

  city!: string;
  country!: string;
  locationMessage: string = '';
  ngOnInit(): void {
    // this.setGreeting();
    this.getLocation();

  }
  getLocation() {
    const apiUrl = `https://ipinfo.io/json?token=78212df9ecbea0`;
    this.http.get(apiUrl).subscribe({
      next: ((response: any) => {
        this.city = response.city;
        this.country = response.country;
        this.locationMessage = `City: ${this.city}, Country: ${this.country}`;
      }), error: (() => {
        this.locationMessage = 'Failed to fetch location data.';
      })
    });
  }


}
