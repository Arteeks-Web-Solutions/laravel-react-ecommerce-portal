<?php

namespace TechStore\Repositories;

use TechStore\Models\Cart;
use TechStore\Models\Product;

class CartRepository extends BaseRepository
{
    /**
     * CartRepository constructor.
     *
     * @param Cart $model
     */
    public function __construct(Cart $model)
    {
        parent::__construct($model);
    }

    /**
     * Add a product to the user's cart.
     *
     * @param int $userId
     * @param mixed $product
     */
    public function addToCart(int $userId, Product $product): void
    {
        $cart = $this->model->firstOrCreate(
            ['user_id' => $userId],
            ['items' => []]
        );

        $items = $cart->items;
        $found = false;

        foreach ($items as &$item) {
            if ($item['product_id'] === $product->id) {
                $item['quantity'] += 1;
                $found = true;
                break;
            }
        }

        if (! $found) {
            $items[] = [
                'product_id' => $product->id,
                'quantity' => 1,
            ];
        }

        $cart->items = $items;
        $cart->save();
    }

    public function count(int $userId): int
    {
        $cart = $this->model->where('user_id', $userId)->first();

        if (!$cart) {
            return 0;
        }

        return array_sum(array_column($cart->items, 'quantity'));
    }
}
