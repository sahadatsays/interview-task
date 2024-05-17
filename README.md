# Version Control Diff Tool

## Installation guide

- Clone the repository
- Run `composer install` to install the dependencies.
- Run `npm install` or `yarn` to install npm dependencies
- Run `npm dev` or `yarn dev` to start vite
- Run `php artisan serve` to run the app on `http://localhost:8000`

## Database setup

- Make `.env` file from `.env.example` file.
- Change database credentials with yours.
- Run `php artisan migrate --seed` to migrate the database.
- Now you are ready to go.

##### Open `http://localhost:8000` in your browser to see the app running.


## Task scheduler run
- Run `php artisan schedule:run` to run the task scheduler


<h1 style="text-align: center;">
    Thanks for reading and happy coding!
</h1>
