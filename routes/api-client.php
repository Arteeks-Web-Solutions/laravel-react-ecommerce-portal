<?php

use TechStore\Http\Controllers\Api\Client;
use Illuminate\Support\Facades\Route;

Route::get('/user', [Client\UserController::class, 'current']);

Route::post('/personal', [Client\UserController::class, 'updatePersonalData']);
Route::post('/address', [Client\UserController::class, 'updateAddressData']);