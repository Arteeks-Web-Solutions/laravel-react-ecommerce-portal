<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;
use TechStore\Models\OrderItem;

class OrderItemResource extends BaseResource
{
    public function __construct(OrderItem $resource)
    {
        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function transformData(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'product_name' => $this->product_name,
            'product_image' => $this->product_image,
            'price' => $this->price,
            'quantity' => $this->quantity,
        ];
    }
}
