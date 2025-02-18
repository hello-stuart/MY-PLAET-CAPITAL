import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetlocationService } from '../../services/getlocation.service';
import { HttpClient } from '@angular/common/http';
import { TranslateLanguageService } from '../../services/translate-language.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  constructor(private getlocation: GetlocationService,
    private http: HttpClient,
    private translationService: TranslateLanguageService) { }
  language!: any;
  greeting: string = '';
  city!: string;
  country!: string;
  locationMessage: string = '';
  weatherData: any;
  weatherCondition: string = '';
  backgroundImage: string = '';
  temperature!: number;


  englishGreeting = 'Hello,';
  nativeGreeting = '';
  textDirection = 'ltr';
  loading = false;

  snowFlakes: any[] = [];
  rainDrops: any[] = [];
  drizzleDrops: any[] = [];
  thunderFlashes: any[] = [];
  movingClouds: any[] = [];
  sunRays: any[] = [];



  ngOnInit(): void {
    this.getLocation();
    this.setGreeting();
    this.generateSnowFlakes(100);
  }
  initWeatherEffects() {
    if (this.weatherCondition === 'rain') {
      this.rainDrops = Array.from({ length: 50 }, () => ({
        delay: `${Math.random() * 2}s`,
        left: `${Math.random() * 100}%`,
        duration: `${0.5 + Math.random() * 0.5}s`,
        length: `${10 + Math.random() * 20}px`
      }));
    }

    if (this.weatherCondition === 'drizzle') {
      this.drizzleDrops = Array.from({ length: 30 }, () => ({
        delay: `${Math.random() * 3}s`,
        left: `${Math.random() * 100}%`,
        duration: `${1 + Math.random() * 2}s`
      }));
    }

    if (this.weatherCondition === 'thunderstorm') {
      this.thunderFlashes = Array.from({ length: 5 }, (_, i) => ({
        delay: `${i * 2 + Math.random() * 5}s`,
        duration: `${0.05 + Math.random() * 0.1}s`
      }));
    }

    if (this.weatherCondition === 'clouds') {
      this.movingClouds = Array.from({ length: 7 }, () => ({
        delay: `${Math.random() * 2}s`,
        left: `${Math.random() * 100}%`,
        speed: `${30 + Math.random() * 20}s`,
        size: `${80 + Math.random() * 120}px`,
        top: `${10 + Math.random() * 60}%`
      }));
    }

    if (this.weatherCondition === 'clear') {
      this.sunRays = Array.from({ length: 12 }, (_, i) => ({
        angle: `${i * 30}deg`,
        delay: `${i * 0.1}s`
      }));
    }
  }
  generateSnowFlakes(count: number) {
    this.snowFlakes = Array.from({ length: count }, () => ({
      delay: `${Math.random() * 5}s`,
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 10}s`,
      size: `${2 + Math.random() * 5}px`
    }));
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

  getWeather(city: string) {
    const weatherApiKey = '6fa7a31565961cf29fd9919fc63e8da5';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;

    this.http.get(weatherUrl).subscribe({
      next: (response: any) => {
        this.weatherData = response;
        this.temperature = response.main.temp;
        const condition = response.weather[0].main.toLowerCase();
        this.weatherCondition = condition;
        this.initWeatherEffects();
        this.getBackgroundImage(condition);
      },
      error: (error) => {
        console.error('Error fetching weather:', error);
      }
    });
  }

  getBackgroundImage(weatherCondition: string) {
    const unsplashApiKey = 'yqAcMWSieEInByNLMbYQU3E01qSqnvUM3kYdZwACmWs';
    const weatherQueries: { [key: string]: string } = {
      rain: 'rainy city',
      snow: 'snowy landscape',
      clear: 'sunny sky',
      clouds: 'cloudy sky',
      thunderstorm: 'stormy weather',
      drizzle: 'rainy street',
      mist: 'foggy city',
      haze: 'hazy landscape'
    };

    const query = weatherQueries[weatherCondition] || 'weather landscape';
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashApiKey}&orientation=landscape`;

    this.http.get(unsplashUrl).subscribe({
      next: (response: any) => {
        if (response.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, response.results.length));
          this.backgroundImage = response.results[randomIndex].urls.regular;
        }
      },
      error: (error) => {
        console.error('Error fetching background image:', error);
        this.backgroundImage = 'assets/default-weather.jpg';
      }
    });
  }

  // getLocation() {
  // const apiUrl = `https://ipinfo.io/json?token=78212df9ecbea0`;
  // this.http.get(apiUrl).subscribe({
  //   next: (response: any) => {
  //     this.city = response.city;
  //     this.country = response.country;
  //     this.locationMessage = `City: ${this.city}, Country: ${this.country}`;
  //     this.getWeather(this.city);
  //   },
  //   error: () => {
  //     this.locationMessage = 'Failed to fetch location data.';
  //   }
  // });
  async getLocation() {
    try {
      const response: any = await this.http.get('https://ipinfo.io/json?token=78212df9ecbea0').toPromise();
      this.locationMessage = `Location: ${response.city}, ${response.country}`;
      this.city = response.city;
          this.country = response.country;
          this.locationMessage = `City: ${this.city}, Country: ${this.country}`;
          this.getWeather(this.city);
      this.loading = true;
      const nativeLanguage = await this.translationService.getNativeLanguage(response.country);
      const translated = await this.translationService.translateGreeting(this.englishGreeting, nativeLanguage);

      this.nativeGreeting = translated;
      this.textDirection = ['AR', 'HE', 'FA'].includes(nativeLanguage.toUpperCase()) ? 'rtl' : 'ltr';

    } catch (error) {
      this.locationMessage = 'Unable to detect location';
      this.nativeGreeting = this.englishGreeting;
      this.locationMessage = 'Failed to fetch location data.';
    } finally {
      this.loading = false;
    }
  }
  // }
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
  clearWeatherEffects() {
    this.rainDrops = [];
    this.drizzleDrops = [];
    this.thunderFlashes = [];
    this.movingClouds = [];
    this.sunRays = [];
    this.snowFlakes = [];
  }
}