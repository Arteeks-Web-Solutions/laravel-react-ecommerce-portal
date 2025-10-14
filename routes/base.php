<?php

use Illuminate\Support\Facades\Route;
use TechStore\Http\Controllers\Base\IndexController;

// These GET routes serve as entry points for the React SPA.
// Each route simply returns a Blade view, but exists to apply
// route-specific middleware such as authentication or admin checks.

Route::get('/admin/{react?}', [IndexController::class, 'index'])
    ->where('react', '.*')
    ->middleware(['auth', 'admin']);

Route::get('/client/{react?}', [IndexController::class, 'index'])
    ->where('react', '.*')
    ->middleware(['auth']);

Route::get('/{react?}', [IndexController::class, 'index'])
    ->where('react', '.*');
