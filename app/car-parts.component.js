"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var mocks_1 = require('./mocks');
var CarPartsComponent = (function () {
    function CarPartsComponent() {
    }
    /*totalCarParts(){
      let sum = 0;
      for (let carPart of this.carParts){
        sum += carPart.inStock;
      }
      return sum;
    }*/
    CarPartsComponent.prototype.totalCarParts = function () {
        return this.carParts.reduce(function (prev, current) {
            return prev + current.inStock;
        }, 0);
    };
    CarPartsComponent.prototype.ngOnInit = function () {
        this.carParts = mocks_1.CARPARTS;
    };
    CarPartsComponent = __decorate([
        core_1.Component({
            selector: 'car-parts',
            templateUrl: 'app/car-parts.component.html',
            styleUrls: ['app/car-parts.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], CarPartsComponent);
    return CarPartsComponent;
}());
exports.CarPartsComponent = CarPartsComponent;
//# sourceMappingURL=car-parts.component.js.map