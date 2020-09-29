import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CurrentWeather {
  current: {
    temperature: number;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prueba-flux';
  selected?: string;
  newCity?: string;
  weather$?: Observable<CurrentWeather>;
  cities = ['Caracas', 'Santiago', 'Buenos Aires', 'New York'];

  constructor(private readonly http: HttpClient) {}

  onCityChange(city: string) {
    this.selected = city;
    this.weather$ = this.getWeather(city);
  }

  onAddCity() {
    if (!this.cities.some((city) => city == this.newCity)) {
      this.cities.push(this.newCity);
    }
  }

  getWeather(city: string) {
    const base = 'http://api.weatherstack.com/current';
    const accessKey = '5d202b2713366934d49426cbad278071';
    const url = `${base}?access_key=${accessKey}&query=${city}&units=m`;

    return this.http.get<CurrentWeather>(url);
  }
}
