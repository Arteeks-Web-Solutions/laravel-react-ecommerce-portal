<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;

class CartDataResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function transformData(Request $request): array
    {
        return [
            'cart'  => $this->resource['cart'],
            'products'    => $this->resource['products'],
        ];
    }
}
