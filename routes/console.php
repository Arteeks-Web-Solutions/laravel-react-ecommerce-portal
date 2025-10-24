<?php

use Illuminate\Support\Facades\Schedule;
use TechStore\Console\Commands\RefreshDemoDataCommand;

Schedule::command(RefreshDemoDataCommand::class)->everyThirtyMinutes();
