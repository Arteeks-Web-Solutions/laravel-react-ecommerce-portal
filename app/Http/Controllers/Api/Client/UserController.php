<?php

namespace TechStore\Http\Controllers\Api\Client;

use TechStore\Http\Resources\UserResource;
use Illuminate\Http\Request;
use TechStore\Http\Controllers\Controller;
use TechStore\Http\Requests\Api\Client\UpdateAddressDataRequest;
use TechStore\Http\Requests\Api\Client\UpdatePersonalDataRequest;

class UserController extends Controller
{
    /**
     * Get the currently authenticated user.
     */
    public function current(Request $request): UserResource
    {
        return new UserResource($request->user());
    }

    /**
     * Update the personal data of the authenticated user.
     */
    public function updatePersonalData(UpdatePersonalDataRequest $request): UserResource
    {
        return $this->updateUserData($request);
    }

    /**
     * Update the address data of the authenticated user.
     */
    public function updateAddressData(UpdateAddressDataRequest $request): UserResource
    {
        return $this->updateUserData($request);
    }

    /**
     * Update user data helper method.
     */
    private function updateUserData(UpdatePersonalDataRequest|UpdateAddressDataRequest $request): UserResource
    {
        $user = $request->user();
        $user->update($request->validated());

        return new UserResource($user);
    }
}
