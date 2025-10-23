<?php

namespace TechStore\Repositories;

use Illuminate\Support\Collection;
use TechStore\Models\OrderItem;

class OrderItemRepository extends BaseRepository
{
    /**
     * OrderItemRepository constructor.
     *
     * @param OrderItem $model
     */
    public function __construct(OrderItem $model)
    {
        parent::__construct($model);
    }

    public function createFromStripeItems(Collection $stripeItems, int $orderId): void
    {
        $items = $stripeItems->map(function ($item) use ($orderId) {
            $product = $item->price->product;

            return [
                'order_id' => $orderId,
                'product_id' => (int) ($product->metadata->product_id ?? 0),
                'product_name' => $product->name ?? 'Unknown product',
                'product_image' => $product->images[0] ?? null,
                'price' => ($item->amount_total ?? 0) / 100,
                'quantity' => $item->quantity ?? 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        $this->model->insert($items);
    }
}
