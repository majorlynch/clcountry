import { Component, Inject, Injectable } from '@angular/core';
import { CountryService } from './country-service.service';
import { OnInit } from '@angular/core';
import { Country } from './country.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [CountryService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  country: Country;
  countries: string[] = [];
  selectedCountry: string='Afghanistan';

  constructor(private countryService: CountryService) {
    this.country = { name: '', capital: '', officialName: '', region: '', subregion: '' };
  }

  ngOnInit() {

    this.countryService.getCountryNames().subscribe({
      //next: data => {return data.flat();
      next: data => {this.countries = data;}
    });

    this.countryService.getCountry(this.selectedCountry).subscribe({
      next: (data) => (this.country = data),
    });
  }

	onCountryChange(value: any): void {
    this.countryService.getCountry(value).subscribe({
      next: (data) => (this.country = data),
    });
	}
}
