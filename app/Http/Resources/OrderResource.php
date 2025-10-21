<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;
use Stripe\Collection;
use TechStore\Models\Order;

class OrderResource extends BaseResource
{
    protected Collection $items;

    public function __construct(Order $resource, Collection $items)
    {
        parent::__construct($resource);
        $this->items = $items;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function transformData(Request $request): array
    {
        return [
            'status' => $this->status,
            'items' => $this->items,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
