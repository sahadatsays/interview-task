<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Models\Task;
use App\Scraper\Scraper;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\Panther\Client;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $tasks = Task::query()->latest()->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'tasks' => $tasks
    ]);
});

Route::get('test', function () {
    $url = 'https://webscraper.io/blog';
    $selectors = [
        'container' => '.blogno',
        'link' => 'a.titleblog',
        'title' => 'a.titleblog',
        'description' => 'div.para',
        'date' => 'p.date',
        'remove_text_from_date' => '',
        'date_format' => '',
        'ref_selector' => '#app-wrapper'
    ];
    Scraper::scraper($url, $selectors);
});

Route::resource('tasks', TaskController::class);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
