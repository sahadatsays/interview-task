# Bulk Product Import

- Clone the project.
```bash
git clone git@github.com:sahadatsays/interview-task.git
```
-  Navigate to the Project Directory
```bash
cd interview-task
```
-  Install Composer Dependencies
```bash
composer install
```
- Create a Copy of the Environment File
```bash
cp .env.example .env
```
- Generate an Application Key
```bash
php artisan key:generate
```
- Set Up Database Configuration
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```
- Run Migrations
```bash
php artisan migrate
```
- Replace the queue connection.
```bash
QUEUE_CONNECTION=database
```

- For test 
```bash
php artisan test
```

## Happy Coding. :) 
