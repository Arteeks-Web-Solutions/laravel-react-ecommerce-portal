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
            // Auth routes
            Route::prefix('auth')
                ->middleware('web')
                ->group(base_path('routes/auth.php'));

            // API routes
            Route::prefix('api')
                ->middleware('web')
                ->group(base_path('routes/api.php'));

            // Admin routes
            Route::prefix('admin')
                ->middleware(['web', 'auth', 'admin'])
                ->group(base_path('routes/admin.php'));

            // Web routes
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
