<?php

namespace TechStore\Http\Requests\Api\Client;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressDataRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'street' => ['required', 'string', 'max:255'],
            'postal_code' => [
                'required',
                'string',
                'max:20',
            ],
            'city' => ['required', 'string', 'max:100'],
        ];
    }
}
