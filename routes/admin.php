<?php

use Illuminate\Support\Facades\Route;
use TechStore\Http\Controllers\Admin;

Route::get('/', [Admin\AdminController::class, 'index']);
