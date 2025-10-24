<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        using: function () {
            Route::prefix('auth')
                ->middleware('web')
                ->group(base_path('routes/auth.php'));

            Route::prefix('api/client')
                ->middleware(['web'])
                ->group(base_path('routes/api-client.php'));

            Route::prefix('api/application')
                ->middleware(['web', 'auth', 'admin'])
                ->group(base_path('routes/api-application.php'));

            Route::middleware('web')
                ->group(base_path('routes/base.php'));
        },

        commands: __DIR__ . '/../routes/console.php',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => \TechStore\Http\Middleware\IsAdmin::class,
        ]);

        $middleware->redirectUsersTo('/shop');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
