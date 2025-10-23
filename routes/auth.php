<?php

use TechStore\Http\Controllers\Auth;

use Illuminate\Support\Facades\Route;

// These GET routes serve as entry points for the React SPA.
// Each route simply returns a Blade view, but exists to apply
// route-specific authentication middleware.

Route::get('/', [Auth\LoginController::class, 'index'])->name('login');
Route::post('/login', [Auth\LoginController::class, 'login']);
Route::post('/logout', [Auth\LoginController::class, 'logout']);

Route::get('/register', [Auth\LoginController::class, 'index']);
Route::post('/register', [Auth\RegisterController::class, 'register']);

Route::get('/password/email', [Auth\LoginController::class, 'index']);
Route::post('/password/email', [Auth\ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('/password/reset', [Auth\ResetPasswordController::class, 'reset'])->name('password.update');

Route::get('password/reset/{token}', [Auth\LoginController::class, 'index'])->name('password.reset');
