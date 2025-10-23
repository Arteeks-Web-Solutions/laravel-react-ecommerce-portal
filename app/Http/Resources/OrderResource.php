<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;
use TechStore\Models\Order;

class OrderResource extends BaseResource
{
    public function __construct(Order $resource)
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
            'email' => $this->email,
            'items' => $this->whenLoaded('items', function () {
                return OrderItemResource::collection($this->items);
            }),
            'shipping_name' => $this->shipping_name,
            'shipping_line1' => $this->shipping_line1,
            'shipping_city' => $this->shipping_city,
            'shipping_postal' => $this->shipping_postal,
            'shipping_country' => $this->shipping_country,
            'status' => $this->status,
            'created_at' => $this->created_at->toAtomString(),
        ];
    }
}
