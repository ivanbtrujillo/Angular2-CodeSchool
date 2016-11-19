import { Component } from '@angular/core';
import { CarPart } from './car-part';
import { RacingDataService } from './racing-data.service';

@Component({
  selector: 'car-parts',
  templateUrl: 'app/car-parts.component.html',
  styleUrls: ['app/car-parts.component.css']
})

export class CarPartsComponent {

  carParts: CarPart[];

  totalCarParts(){
    let sum = 0;
    if(Array.isArray(this.carParts)){
      for (let carPart of this.carParts){
        sum += carPart.inStock;
      }
    }
    return sum;
  }
  constructor( private racingDataService: RacingDataService ){ }

  /*totalCarParts(){
    return this.carParts.reduce((prev, current) =>
        prev + current.inStock, 0
    );
  }*/


  ngOnInit(){
    this.racingDataService.getCarParts()
      .subscribe(carParts => this.carParts = carParts);
  }

  upQuantity(carPart) {
    if(carPart.quantity < carPart.inStock) carPart.quantity++;
  }
  downQuantity(carPart) {
    if(carPart.quantity != 0) carPart.quantity--;
  }
}
