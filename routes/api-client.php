<?php

use TechStore\Http\Controllers\Api\Client;
use Illuminate\Support\Facades\Route;

Route::get('/user', [Client\UserController::class, 'current']);
