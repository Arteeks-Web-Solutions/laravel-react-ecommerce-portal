<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;
use Stripe\Collection;
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
            'items' => $this->items,
            'status' => $this->status,
            'created_at' => $this->created_at->toAtomString(),
        ];
    }
}
