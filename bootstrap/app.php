<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting()
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => \TechStore\Http\Middleware\IsAdmin::class,
        ]);

        $middleware->redirectUsersTo('/shop');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
