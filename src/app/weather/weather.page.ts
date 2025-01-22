import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.page.html',
  styleUrls: ['weather.page.scss'],
  standalone: false,
})
export class WeatherPage {

  city = 'Prague';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ionViewDidEnter() {
    this.loadWeather();
  }

  loadWeather() {
    this.weatherService.getWeatherByCity(this.city).subscribe(
      (data) => {
        this.weatherData = data;
        console.log(data);
      },
      (error) => {
        console.error('Error loading weather', error);
      }
    );
  }

}
