<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
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
