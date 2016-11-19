# Angular 2

## Introduction

Angular is a framework for dynamic web applications that provides a way to organize your HTML,
JavaScript and CSS to keep our front-end code clean.

Angular was released in 2011 and it's mantained by Google.

## Diferences between Angular 1

* Speed: Angular 2 is faster.
* Components: Instead of controllers and scope, we use components, which feel simpler.
* Simpler Directives: Creating custom directives is much simpler.
* Intuitive Data Binding:  when we need to link data to an HTML element or listen for a button clicking
on the page, we have an intuitive syntax.
* Services are now just a class.

Many more small improvements.

## What language to use with angular2 ?
* JavaScript :  But all browser don't support ES6. We can use babel and transpile ES6 to ES5.
* TypeScript : A Microsoft extension of JS which provides a set of tools and allows the use of ES& features.
Also adds a powerful type checking and object-oriented features. TypeScript files uses the .ts extension instead
of .js. TypeScript compiles into Javascript.

We should use TypeScript, because is a more typed language and the Angular2
core is written using TypeScript.

Our browser don't know how to read TypeScript out of the box, so we jave two option when it comes to
changing our TypeScript code into Javascript.
We can transpile to Javascript in the browser o we can transpile to javascript before shipping to
browser (this is faster).

## SystemJS

SystemJS is a Javascript library that allow us to import other libraries.

## Components

Components are the building blocks of Angular2 applications, and they easily nest one
inside the other.

Each component may have its own:
* class file
* html file
* css file


A component is a decorator function. A decorator adds more behavior to our class
from outside the class. It must be declared immediately before the class.
Decorators is TypeScript feature.
```
@Component({
  selector: 'my-app',
  template: '<h1>Ultra Racing</h1>'
})
```

The component **selector** is the CSS selector for the HTML element where
we want the component to lead.

The component **template** is the content we want to load inside our selector.

## Modules

Modules are how we organize our application in Angular. Every Angular application must have a
"root module", which we'll need to launch it.

Inside the root module, we need to import two main libraries to render the app:
* BrowserModule: Module needed for running Angular websites.
* platformBrowserDynamic: Angular library that will render the website.

To use the BrowserModule dependencies, we need to load it inside the NgModule metadata
(inside imports).
Importing platformBrowserDynamic allow us to set the bootstrap property to the NgModule
metadata.
At the end of the module we write the following code to render the component as root component:
```
platformBrowserDynamic().bootstrapModule(AppModule);
```

## Directives

A directive (within Angular) is how we add dynamic behavior to HTML. There are three diferent
kinds of directives:

* Component: has a template.
* Structural: Alters layout by adding, removing or replacing HTML elements.
For example: *ngFor
* Attribute

## Pipes

A pipe takes in data as input and transforms it to a desired output.
For example: | uppercase, | lowercase , | decimal

# Main structure and scalability

We've been developing Angular 2 in one single file: main.ts. This isn't going to scale, so let's split things
up into pieces and get organized.

Main.ts will be splited into three files:
* main.ts: Where we'll bootstrap our app, loading our first component.
* app.component.ts: This component contains our page header.
* car-parts.component.ts: This contains our list of car parts.

## Exporting and importing.

First, we export the class we want to import.
Then, we import this class into our main.ts file.
We need to use the ES2015 feature of exporting and importing.

To use a component in our app, first we need to import our component into main.ts and then
add this component into NgModule declarations array so it can be used through the rest of our application.

Remember that angular 2 uses component-based architecture.

## Component HTML & CSS

To add CSS to our component, we can add the styles property to our Component metadata. The styles must be
an array with our classes inside.
```
styles: [`
  .description {
    color: #444,
    font-size: small;
  }
  .price {
    font-weight: bold;
  }
`]
```
When we declarates styles inside a component, Angular 2 adds a custom atribute to scope the CSS to
only this component. Kinda like properties are scoped, the CSS is scoped too!

We can write our HTML and CSS in separated files, and then refer it using the templateUrl and styleUrls properties
inside the Component metadata:

```
  templateUrl: 'app/car-parts.component.html',
  styleUrls: [ 'app/car-parts.component.css']
```

## Mocks and Models

TypeScript gives us the ability to be more object oriented with our data, so let's create a model.
```
export class CarPart {
  id: number;
  name: string;
  description: string;
  inStock: number;
  price: number;
}
```

Then in our component, we can specify that our CarParts array is an array of CarPart. We need to import CarPart for that
and then using :CarPart[] we indicates that is an array of CarPart.
```
import { CarPart } from './car-part';
carParts: CarPart[] = [
  {...},
  {...},
]
```

Eventually we want to call out to a web service (API) to get the latest car parts, so it's a
good practice to move our mock (fake) data out into its own file (mock.ts).
```
import { CarPart } from './car-part';

export const CARPARTS: CarPart[] = [
  {
    "id": 1,
    "name": "Super Tires",
    "description": "These tires are the very best",
    "inStock": 5,
    "price": 4.99
  },
  {
    "id": 2,
    "name": "Reinforced Shocks",
    "description": "Shocks made from kyptonite",
    "inStock": 4,
    "price": 9.99
  },
  {
    "id": 3,
    "name": "Padded Seats",
    "description": "Super soft seats for a smooth ride",
    "inStock": 0,
    "price": 14.99
  }
]
```

Notice we use const instead of left. This is an ES2015 feature that makes sure CARPARTS can't be reassigned.

Then we need to import our mock file into our CarParts componend and set it into an ngOnInit method:
```
import { CARPARTS } from './mmocks';

ngOnInit(){
  this.carParts = CARPARTS;
}
```

ngOnInit its invoked after the component is constructed and is the best place to initialize property values.

# Property & Class Binding

Not having to work with more complex HTML has been nice as we've learned Angular,
but now we're going to implement a better design.

When using a web framework like Angular that abstracts your code from HTML, there
are a few different ways that data can flow:
* Javascript to HTML
* HTML to Javascript
* Both ways

## Adding images to our model
We will add this property to our model, add new files and add them to our mock data.

We could try adding our image onto our page using interpolation {{carPart.image}} (this will work fine), but
there's an alternative syntax we can use when we want to set DOM element property values.
This is property binding, and allows us to glue component properties to DOM element properties.
```
<img [src]="carPart.image">
```
The square brackets tell Angular to set this DOM element property to our component property, and if the
component property changes, update this.

To add additional properties, we need to add brackets and specify a component property. For example:
```
<div [hidden]="!user.isAdmin">secret</div>
<button [disabled]="isDisabled">Purchase</div>
<img [alt]="image.description" [src]="carPart.image" >

To add a class to our component, we can use brackets too.
If carPart.featured is true, then the featured class is added. If carPart.featured is false, then the featured
class is removed.

```
<li *ngFor="let carPart of carParts" [class.featured] ="carPart.featured">
    ....
</li>
```

## DOM Events

To send a DOM event (mouseover, blur, click) to our component, we just need to create inside our
component class the method that we want to invoke. Then, inside our html, any standard DOM event
can be listened for by wrapping it in parentheses and removing the "on" at the beginning of the word.
```
<div (mouseover)="call()">
<input (blur)="call()">
<form (submit)="call()">
```

Sometimes you need additional event data, like which key is pressed or where the mouse is on the screen.
This is what the Angular event object is for.
```
<input type="text" (keydown)="showKey($event)">
```
We can send the $event object into our methods.
```
showKey(event){
  console.log(event.clentX + "," + event.clientY);
}
```

We could also call event.preventDefault(); to prevent a clicked link form being followed or a form from
being submitted.

## Keeping things in sync using two way data binding

First we need to import the FormsModule inside main.ts:
```
import { FormsModule } from '@angular/forms';
```
And then, add it into our imports array:
```
  imports: [ BrowserModule, FormsModule ],
```

To make a two data binding into our HTML, we will use a syntax called "banana in a box":
```
  <input class="number" type="text" [(ngModel)]="carPart.quantity">
```

# Services

Using mocks of data isn't the best method. We'd need to import the mocks on every file that
needs the data. If the way we access this data changes, we'd have to change it everywhere.

It's not easy to switch between real and mock data.

This sort of data loading is best left to service clases.

Services are used to organize and share code across your app, and they're usually
where we create our data access methods.

First, let's create the simplest service and then we'll learn something called
dependency injection to make it even more powerful.

Create a racing-data.service.ts file with the following content:
```
import { CARPARTS } from './mocks';

export class RacingDataService {
  getCarParts() {
    return CARPARTS;
  }
}
```
On our car-parts.component.ts we need to import this service and then, inside our ngOnInit
method we create an instance of the service and call this getCarParts method.

```
import { RacingDataService } from './racing-data.service';
ngOnInit(){
  let racingDataService = new RacingDataService();
  this.carParts = racingDataService.getCarParts();
}
```

This works, but:
* Classes using this service must know how to create a RacingDataService.
* We'll be creating a new RacingDataService every time we need to fetch car parts.
* It'll be harder to switch between a mock service and a real one.

## Introducing Dependency Injection

When you run an Angular 2 app, it creates a dependency injector. An injector is in charge
of knowing how to create and send things.
The injector knows how to inject our dependencies. If the injector already created a service, we can have it resend
the same service.
We must tell the injector what it can inject by registering "providers" with it.
* Add the inkectable decorator to RacingDataService.
* Let our injector know about our service by naming its as a provider.
* Inject the dependency into our car-parts.component.ts

1. Into our racing-data.service.ts, import Injectable and add the Injectable decorator:
```
import { Injectable } from '@angular/core';

@Injectable()
export class RacingDataService { ... }
```

2. We want all our subcomponents to have access to RacingDataService. To do this, we register it as
a provider at the top level (main.ts, providers array):
```
import { RacingDataService } from './racing-data.service';

providers: [ RacingDataService ]
```
3. We need to inject the dependency into our car-parts.component:
```
import { RacingDataService } from './racing-data.service';

export class CarPartsComponent {
 ...
 constructor( private racingDataService: RacingDataService ){ }

}
```

4. To use the service, we just need to write it inside ngOnInit:
```
ngOnInit() {
  this.carParts = this.racingDataService.getCarParts();
}
```
Now our app is more scalable and testable:
* Scalable because our dependencies aren't strongly tied to our classes.
* Testable because it'd be easy to mock services when we test the component.

## Http

First, we need to create a JSON data file to load from our service (car-parts.json).

The http library provides the get call we will use to call across the internet.
The RXJS library stands for Reactive Extensions and provides some advance tooling for
our http calls.

To inject the Http service, we need to import the HttpModule in main.ts and add it into
the imports array:
```
import { HttpModule } from '@angular/http';

imports: [ BrowserModule, FormsModule, HttpModule ]
```

Then, we need to add Http and rxjs map into our service:

```
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
```
After that, we add a constructor inside the service class to create an instance of Http:
```
constructor (private http: Http ) { }
```

And finally, inside getCarParts we make an http request to fetch the data:
```
getCarParts() {
  return this.http.get('app/car-parts.json')
    .map(response => <CarPart[]>response.json().data);
}
```

Since our service now returns an observable object, we need to subscribe to that data stream and
tell our component what to do when our data arrives.

```
ngOnInit(){
  this.racingDataService.getCarParts()
    .subscribe(carParts => this.carParts = carParts);
}
```

Finaly, we need to fix our car-parts component to only iterate into an array after
we get the data from internet:
```
totalCarParts(){
    let sum = 0;
    if(Array.isArray(this.carParts)){
      for (let carPart of this.carParts){
        sum += carPart.inStock;
      }
    }
    return sum;
  }
```

TODO:
Add error handling and testing.
