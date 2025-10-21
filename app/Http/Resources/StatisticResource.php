<?php

namespace TechStore\Http\Resources;

use Illuminate\Http\Request;

class StatisticResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected function transformData(Request $request): array
    {
        return [
            'customers_count' => $this->resource['customers_count'],
            'orders_count' => $this->resource['orders_count'],
            'total_revenue' => $this->resource['total_revenue'],
            'products_count' => $this->resource['products_count'],
            'recent_orders' => OrderResource::collection($this->resource['recent_orders']),
            'top_products' => ProductResource::collection($this->resource['top_products']),
        ];
    }
}
