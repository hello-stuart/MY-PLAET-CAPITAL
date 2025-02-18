import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "../home/home.component";
import { CommonModule } from '@angular/common';
import { BackgroundImageDirective } from '../../directives/background-image.directive';
import { GetlocationService } from '../../services/getlocation.service';

@Component({
  selector: 'app-site-layout',
  imports: [CommonModule, HomeComponent, HeaderComponent],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.css',
  standalone: true,
})
export class SiteLayoutComponent {
  constructor(private getlocation: GetlocationService) { }
  greeting: string = '';
  city!: string;
  country!: string;
  locationMessage: string = '';
  backgroundImage!: string;


  ngOnInit(): void {
    this.setGreeting();
    this.getlocation.getLocation().subscribe({
      next: ((response: any) => {
        this.city = response.city;
        this.country = response.country;
        console.log(this.city)

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

}