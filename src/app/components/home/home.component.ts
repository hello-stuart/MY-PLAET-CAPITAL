import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetlocationService } from '../../services/getlocation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  constructor(private getlocation: GetlocationService , private http:HttpClient) { }

  greeting: string = '';
  city!: string;
  country!: string;
  language!: any;
  locationMessage!: string;
 


  ngOnInit(): void {
    this.setGreeting();
    this.getlocation.getLocation().subscribe({
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