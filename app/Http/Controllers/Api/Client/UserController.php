<?php

namespace TechStore\Http\Controllers\Api\Client;

use TechStore\Http\Resources\UserResource;
use Illuminate\Http\Request;
use TechStore\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Get the currently authenticated user.
     */
    public function current(Request $request): UserResource
    {
        return new UserResource($request->user());
    }
}
