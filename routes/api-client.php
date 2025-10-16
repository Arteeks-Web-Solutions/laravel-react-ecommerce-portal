<?php

use TechStore\Http\Controllers\Api\Client;
use Illuminate\Support\Facades\Route;

Route::get('/user', [Client\UserController::class, 'current'])->middleware('auth');

Route::group(['prefix' => 'client', 'middleware' => ['auth']], function () {
    Route::post('/personal', [Client\UserController::class, 'updatePersonalData']);
    Route::post('/address', [Client\UserController::class, 'updateAddressData']);
});

Route::group(['prefix' => 'shop'], function () {
    Route::get('/', [Client\ShopController::class, 'index']);
    Route::get('/products/{id}', [Client\ShopController::class, 'productDetails']);

    Route::group(['prefix' => 'cart', 'middleware' => ['auth']], function () {
        Route::post('/merge', [Client\ShopController::class, 'mergeCart']);
        Route::post('/{product:id}', [Client\ShopController::class, 'addToCart']);
    });
});
