<?php

use App\Http\Controllers\BulkProductController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', [BulkProductController::class, 'create']);
Route::post('/', [BulkProductController::class, 'upload'])->name('products.upload');
