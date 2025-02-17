import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetlocationService {

  constructor(private http:HttpClient) { }
  getLocation() {
    const apiUrl = `https://ipinfo.io/json?token=78212df9ecbea0`;
    return this.http.get(apiUrl);
  }

}
