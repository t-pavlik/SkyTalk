import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'b28d48fd803a0ca4cc62eed52e8451de';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<Weather> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url).pipe(
      map((data) => {
        return {
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          date: new Date(data.dt * 1000).toLocaleDateString(),
        } as Weather;
      })
    );
  }
}

export interface Weather {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  date: string;
}

