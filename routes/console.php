<?php

use Illuminate\Console\Scheduling\Schedule;
use TechStore\Console\Commands\RefreshDemoDataCommand;

return function (Schedule $schedule) {
    if (config('app.demo')) {
        $schedule->command(RefreshDemoDataCommand::class)->everyThirtyMinutes();
    }
};
