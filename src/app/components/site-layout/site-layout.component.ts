import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "../home/home.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-layout',
  imports: [HeaderComponent, HomeComponent, CommonModule],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.css',
  standalone:true,
})
export class SiteLayoutComponent {


  constructor(private http: HttpClient) { }

  greeting: string = '';



  city!: string;
  country!: string;
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