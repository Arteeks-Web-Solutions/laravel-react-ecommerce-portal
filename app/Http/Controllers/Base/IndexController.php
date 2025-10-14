<?php

namespace TechStore\Http\Controllers\Base;

use Illuminate\Contracts\View\View;
use Illuminate\Contracts\View\Factory;
use TechStore\Http\Controllers\Controller;

class IndexController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(private Factory $view) {}

    /**
     * Handle all incoming requests for the authentication routes and render the
     * base authentication view component. React will take over at this point and
     * turn the login area into an SPA.
     */
    public function index(): View
    {
        return $this->view->make('app');
    }
}
