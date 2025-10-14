<?php

use TechStore\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/user', [Controllers\UserController::class, 'current'])->middleware('auth:sanctum');
