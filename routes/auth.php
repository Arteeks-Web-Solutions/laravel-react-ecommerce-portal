<?php

use TechStore\Http\Controllers\Auth;

use Illuminate\Support\Facades\Route;

// Login Routes
Route::post('login', [Auth\LoginController::class, 'login']);
Route::post('logout', [Auth\LoginController::class, 'logout'])->name('logout');

// Registration Routes
Route::post('register', [Auth\RegisterController::class, 'register']);

// Password Reset Routes
Route::post('password/email', [Auth\ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('password/reset', [Auth\ResetPasswordController::class, 'reset'])->name('password.update');
