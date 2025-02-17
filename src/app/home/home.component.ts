import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private http: HttpClient) { }

  greeting: string = '';

  // latitude!: number;
  // longitude!: number;
  // locationMessage: string = '';

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

  // for user location
  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.latitude = position.coords.latitude;
  //         this.longitude = position.coords.longitude;
  //         this.locationMessage = `Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
  //       },
  //       (error) => {
  //         switch (error.code) {
  //           case error.PERMISSION_DENIED:
  //             this.locationMessage = 'User denied the request for Geolocation.';
  //             break;
  //           case error.POSITION_UNAVAILABLE:
  //             this.locationMessage = 'Location information is unavailable.';
  //             break;
  //           case error.TIMEOUT:
  //             this.locationMessage = 'The request to get user location timed out.';
  //             break;
  //         }
  //       }
  //     );
  //   } else {
  //     this.locationMessage = 'Geolocation is not supported by this browser.';
  //   }
  // }



}
