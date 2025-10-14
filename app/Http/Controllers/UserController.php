<?php

namespace TechStore\Http\Controllers;

use TechStore\Http\Resources\UserResource;
use Illuminate\Http\Request;

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
