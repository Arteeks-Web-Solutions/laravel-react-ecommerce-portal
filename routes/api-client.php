<?php

use TechStore\Http\Controllers\Api\Client;
use Illuminate\Support\Facades\Route;

Route::get('/user', [Client\UserController::class, 'current'])->middleware('auth');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/order/{order:id}', [Client\OrderController::class, 'view']);

    Route::post('/personal', [Client\UserController::class, 'updatePersonalData']);
    Route::post('/address', [Client\UserController::class, 'updateAddressData']);
});

Route::group(['prefix' => 'shop'], function () {
    Route::get('/', [Client\ShopController::class, 'index']);

    Route::post('/checkout', [Client\ShopController::class, 'checkout'])->middleware('auth');
    Route::get('/checkout/success', [Client\ShopController::class, 'checkoutSuccess']);

    Route::group(['prefix' => 'cart'], function () {
        Route::get('/', [Client\ShopController::class, 'getCart']);

        Route::post('/', [Client\ShopController::class, 'updateCart'])->middleware('auth');
        Route::post('/merge', [Client\ShopController::class, 'mergeCart'])->middleware('auth');
        Route::post('/{product:id}', [Client\ShopController::class, 'addToCart'])->middleware('auth');
    });
});
