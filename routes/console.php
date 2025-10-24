<?php

use Illuminate\Console\Scheduling\Schedule;
use TechStore\Console\Commands\RefreshDemoDataCommand;

if (config('app.demo')) {
    Schedule::command(RefreshDemoDataCommand::class)->everyThirtyMinutes();
}
