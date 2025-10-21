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

    public function createFromStripeSession(Session $session): Order
    {
        $order = $this->model->create([
            'user_id' => $session->client_reference_id,
            'status' => 'completed',
            'stripe_session_id' => $session->id,
        ]);

        return $order;
    }
}
