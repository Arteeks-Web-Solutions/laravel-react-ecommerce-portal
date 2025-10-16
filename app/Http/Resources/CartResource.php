<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;

class CartResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function transformData(Request $request): array
    {
        return [
            'items' => $this->items,
        ];
    }
}
