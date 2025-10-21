<?php

use Illuminate\Support\Facades\Route;
use TechStore\Http\Controllers\Api\Application;

Route::prefix('products')->group(function () {
    Route::get('/', [Application\ProductController::class, 'index']);

    Route::post('/', [Application\ProductController::class, 'storeProduct']);
    Route::post('/category', [Application\ProductController::class, 'storeCategory']);
    Route::post('/{product:id}', [Application\ProductController::class, 'updateProduct']);

    Route::delete('/{product:id}', [Application\ProductController::class, 'deleteProduct']);
    Route::delete('/category/{category:id}', [Application\ProductController::class, 'destroyCategory']);
});

Route::prefix('orders')->group(function () {
    Route::get('/', [Application\OrderController::class, 'index']);

    Route::post('/{order:id}', [Application\OrderController::class, 'update']);
});
