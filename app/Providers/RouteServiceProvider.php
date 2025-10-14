<?php

namespace TechStore\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->routes(function () {
            Route::prefix('auth')
                ->middleware('web')
                ->group(base_path('routes/auth.php'));

            Route::prefix('api/client')
                ->middleware(['web', 'auth'])
                ->group(base_path('routes/api-client.php'));

            Route::prefix('api/application')
                ->middleware(['web', 'auth', 'admin'])
                ->group(base_path('routes/api-application.php'));

            Route::middleware('web')
                ->group(base_path('routes/base.php'));
        });
    }
}
