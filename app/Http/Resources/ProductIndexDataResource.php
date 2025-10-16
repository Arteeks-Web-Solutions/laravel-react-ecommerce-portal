<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;

class ProductIndexDataResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function transformData(Request $request): array
    {
        return [
            'categories'  => $this->resource['categories'],
            'products'    => $this->resource['products'],
            // cart_count is optional, only included if present
            'cart_count'  => $this->resource['cart_count'] ?? null,
        ];
    }
}
