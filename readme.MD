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

