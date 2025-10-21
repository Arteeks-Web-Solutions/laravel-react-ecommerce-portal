<?php

namespace TechStore\Repositories;

use Stripe\Checkout\Session;
use TechStore\Models\Order;

class OrderRepository extends BaseRepository
{
    /**
     * OrderRepository constructor.
     *
     * @param Order $model
     */
    public function __construct(Order $model)
    {
        parent::__construct($model);
    }

    /**
     * Get orders for a specific user.
     *
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUserOrders(int $userId)
    {
        return $this->model->where('user_id', $userId)->orderBy('created_at', 'desc')->get();
    }

    /**
     * Create an order from a Stripe session.
     *
     * @param Session $session
     * @return Order
     */
    public function createFromStripeSession(Session $session, array $items): Order
    {
        $order = $this->model->create([
            'user_id' => $session->client_reference_id,
            'items' => $items,
            'status' => 'pending',
            'stripe_session_id' => $session->id,
        ]);

        return $order;
    }
}
