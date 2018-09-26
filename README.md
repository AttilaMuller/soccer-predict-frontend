# Soccer Predict
This project is deployed at https://soccerpredict-app.firebaseapp.com/. The API can be reached at https://soccerpredict.herokuapp.com/.

## The application

Soccer Predict is an application which main features include: Listing up to date football results, presenting next matches, making current football
standings available.

## Social aspect 

Users are be able to login and chat about particular matches.

# Project structure

## Frontend

The frontend is made with Angular 6, state management is done via services using RxJs. https://github.com/AttilaMuller/soccer-predict-frontend

## Backend

The backend API is made with NodeJs Express, particularly InversifyJs. https://github.com/AttilaMuller/soccer-predict-api

## Database

MongoDb is used to preserve match comments, and user information.

## Authentication

Authentication and authorization is managed by Auth0.

## 3rd party API

Match data is gathered from https://www.football-data.org/.

## Development server

In order to start the API, run npm start, navigate to http://localhost:8080/.



# Agular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

