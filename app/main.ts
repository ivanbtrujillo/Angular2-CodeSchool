import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { CarPartsComponent } from './car-parts.component';

@NgModule({
  declarations: [ AppComponent, CarPartsComponent ],
  imports: [ BrowserModule ],
  bootstrap: [ AppComponent ]
})

class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
