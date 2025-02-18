import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateLanguageService {

  private readonly translateApi = 'https://api.mymemory.translated.net/get';
  private readonly countryApi = 'https://restcountries.com/v3.1/alpha/';

  constructor(private http: HttpClient) { }

  async getNativeLanguage(countryCode: string): Promise<string> {
    try {
      const response: any = await this.http.get(`${this.countryApi}${countryCode}`).toPromise();
      return Object.values(response[0].languages)[0] as string;
    } catch (error) {
      return 'English'; // Fallback
    }
  }

  async translateGreeting(text: string, targetLang: string): Promise<string> {
    try {
      const response: any = await this.http.get(
        `${this.translateApi}?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      ).toPromise();
      return response.responseData.translatedText || text;
    } catch (error) {
      return text;
    }
  }
}
