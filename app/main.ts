import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { CarPartsComponent } from './car-parts.component';

import { RacingDataService } from './racing-data.service';

@NgModule({
  declarations: [ AppComponent, CarPartsComponent ],
  imports: [ BrowserModule, FormsModule, HttpModule ],
  bootstrap: [ AppComponent ],
  providers: [ RacingDataService ]
})

class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
