import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
import { Country } from './country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countriesArray: string[];

  constructor(private http: HttpClient) {
    this.countriesArray = [];
  }

  firstCountry: string = '';

  getCountry(country:string) {
    return this.http
      .get<any[]>('https://restcountries.com/v3.1/name/'+country)
      .pipe(
        map((response) => {
          return {
            capital: response[0].capital[0],
            name: response[0].name?.common,
            officialName:response[0].name?.official,
            region:response[0].region,
            subregion:response[0].subregion,
          };
        })
      );
  }

  getCountryNames() {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
      map((countries) =>
        countries.map((country) => {
          return country?.name.common;
        }).sort()
      )
    );
  }
}
