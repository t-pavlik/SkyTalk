import { Component, OnInit } from '@angular/core';
import { Weather, WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.page.html',
  styleUrls: ['weather.page.scss'],
  standalone: false,
})
export class WeatherPage implements OnInit {
  weather: Weather | null = null;
  city: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.city = 'Prague';
    this.loadWeather();
  }

  loadWeather() {
    if (!this.city.trim()) {
      return;
    }

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.weather = data;
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
      },
    });
  }
}
