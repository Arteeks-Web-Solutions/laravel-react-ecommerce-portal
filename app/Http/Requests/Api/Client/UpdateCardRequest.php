<?php

namespace TechStore\Http\Requests\Api\Client;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCardRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // we can't use exists rule here because the product might not be available anymore
            'product_id' => ['required', 'integer'],
            'quantity' => ['required', 'integer'],
        ];
    }
}
