# Deploy to aws s3 bucket

chmod +x ./cicd/aws_deploy.sh <br />
./cicd/aws_deploy.sh

# Local and CI container operations

## Locally
docker build -f ./local.dockerfile . --tag cat-app-image <br />
docker run --name cat-app -d -p 8888:80 cat-app-image

## CI build
docker build -f ./cicd/ci.dockerfile . --tag ci-cat-app <br />
docker run --name ci-cat -d -p 9000:80 ci-cat-app

## Stop and remove all containers
docker stop $(docker ps -aq) <br />
docker rm $(docker ps -aq)

# AngularTourOfHeroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
