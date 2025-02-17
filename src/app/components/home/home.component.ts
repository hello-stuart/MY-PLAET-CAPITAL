import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  constructor(private http: HttpClient) { }

  greeting: string = '';
  city!: string;
  country!: string;
  language!: any;
  locationMessage: string = '';


  ngOnInit(): void {
    this.setGreeting();
    this.getLocation();

  }



  setGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }



  // get loction
  getLocation() {
    const apiUrl = `https://ipinfo.io/json?token=78212df9ecbea0`;
    this.http.get(apiUrl).subscribe({
      next: ((response: any) => {
        this.city = response.city;
        this.country = response.country;
        this.getLanguage(response.country)

        this.locationMessage = `City: ${this.city}, Country: ${this.country}`;
      }), error: (() => {
        this.locationMessage = 'Failed to fetch location data.';
      })
    });
  }

  // get Language
  getLanguage(countryCode: string) {
    const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
    this.http.get(url).subscribe({
      next: ((res: any) => {
        const countryData = res[0];
        const languages = Object.values(countryData.languages);
        this.language = languages[0];
        this.locationMessage = `City: ${this.city}, Country: ${this.country}, Native Language: ${this.language}`;
      }), error: (() => {
        this.locationMessage = 'Failed to fetch language data.';
      })
    });
  }




}