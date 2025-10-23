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
    public function createFromStripeSession(Session $session): Order
    {
        // save customer email and shipping info per order to
        // allow different shipping address than user's default
        $order = $this->model->create([
            'user_id' => $session->client_reference_id,
            'email' => $session->customer_email,
            'shipping_name' => $session->metadata->shipping_name,
            'shipping_line1' => $session->metadata->shipping_line1,
            'shipping_city' => $session->metadata->shipping_city,
            'shipping_postal' => $session->metadata->shipping_postal,
            'shipping_country' => $session->metadata->shipping_country,
            'status' => 'pending',
            'stripe_session_id' => $session->id,
        ]);

        return $order;
    }
}
