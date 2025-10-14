<?php

namespace App\Providers;

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
            // API routes
            Route::prefix('api')
                ->middleware('web')
                ->group(base_path('routes/api.php'));

            // Auth routes
            Route::prefix('auth')
                ->middleware('web')
                ->group(base_path('routes/auth.php'));

            // Web routes
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
