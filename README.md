
# Health Challenge Tracker Application

This Angular application allows users to track their health and workout activities. Users can add, update, and view their workout details. The application is built using Angular 18+, Angular Material, and Tailwind CSS.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Deployment](#deployment)


## Features
- Add and update user workout details.
- Form validation with error messages.
- Display workout types and durations.
- Uses Angular Material components for UI.
- Tailwind CSS for styling.
- Primeng for charting.

## Installation
To get started with the application, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/health-challenge-tracker.git
    ```

2. Navigate to the project directory:
    ```sh
    cd health-challenge-tracker
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage
To start the development server, run:
    ```sh
    ng serve
    ```
The application will be available at http://localhost:4200.


##  Running Tests

Unit tests are written for one component and one service with 100% code coverage.

=============================== Coverage summary ===============================
Statements   : 65.45% ( 72/110 )
Branches     : 20.83% ( 5/24 )
Functions    : 67.56% ( 25/37 )
Lines        : 65% ( 65/100 )
================================================================================


## Deployment 

project is live in https://health-tracking-appl-git-51fb4d-akshay-patels-projects-4a84c78d.vercel.app/



health-challenge-tracker/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── user-form/
│   │   │   │   ├── user-form.component.ts
│   │   │   │   ├── user-form.component.html
│   │   │   │   ├── user-form.component.css
│   │   │   ├── user-list/
│   │   │   │   ├── user-list.component.ts
│   │   │   │   ├── user-list.component.html
│   │   │   │   ├── user-list.component.css
│   │   ├── services/
│   │   │   ├── user.service.ts
│   │   ├── models/
│   │   │   ├── user.ts
│   ├── assets/
│   ├
│   ├── styles.css
├── angular.json
├── package.json
├── README.md

## Contribuation

 Contributions are welcome! Feel free to open an issue or submit a pull request to improve the application.
