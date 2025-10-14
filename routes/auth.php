<?php

use TechStore\Http\Controllers\Auth;

use Illuminate\Support\Facades\Route;

// the GET routes render the React SPA for authentication routes.
// The controller itself just returns a Blade view, but these routes
// exists to apply auth middleware or other route-specific protections.

// Login Routes
Route::get('login', [Auth\LoginController::class, 'index']);
Route::post('login', [Auth\LoginController::class, 'login']);
Route::post('logout', [Auth\LoginController::class, 'logout']);

// Registration Routes
Route::get('register', [Auth\LoginController::class, 'index']);
Route::post('register', [Auth\RegisterController::class, 'register']);

// Password Reset Routes
Route::get('password/email', [Auth\LoginController::class, 'index']);
Route::post('password/email', [Auth\ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('password/reset', [Auth\ResetPasswordController::class, 'reset'])->name('password.update');
