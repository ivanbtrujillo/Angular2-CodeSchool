import { CarPart } from './car-part';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RacingDataService {

  constructor (private http: Http ) { }

  getCarParts() {
      return this.http.get('app/car-parts.json')
        .map(response => <CarPart[]>response.json().data);
  }
}
