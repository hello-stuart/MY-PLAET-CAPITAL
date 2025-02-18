import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class WeatherInformationService {

  constructor() { }

  private weatherCondition = new BehaviorSubject<string>('clear');
  currentWeather$ = this.weatherCondition.asObservable();

  updateWeather(condition: string) {
    this.weatherCondition.next(condition);
  }
}
