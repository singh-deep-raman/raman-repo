# NagpStudentOnboarding

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



# Raman's changes or challenges faced
# 1 - Install In-Memory-Web-Api library for mock http calls
npm i angular-in-memory-web-api --save

# 2 - installed Faker.js library for dummy data
npm install faker --save

# 3 - Install RXJS
npm install rxjs --save

# 4 - Install PrimeNG for UI 
npm install primeng --save
npm install primeicons --save

# 5 - Install @angular/cdk to avoid below error:
  # ERROR in primeng\components\multiselect\multiselect.ts(782,41): Error during template compile of 'MultiSelectModule'
  # Could not resolve @angular/cdk/scrolling relative to [object Object]..
npm install @angular/cdk --save

# 6 - Install BrowserAnimationsModule to avoid error 
  # Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.
npm install @angular/platform-browser --save
npm install @angular/platform-browser-dynamic --save

# 7 - Install prime icons
npm install primeicons --save

# 8 - Install font-awesome and angular-font-awesome using following command
npm install --save font-awesome angular-font-awesome
