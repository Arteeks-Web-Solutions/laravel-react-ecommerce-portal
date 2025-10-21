<?php

namespace TechStore\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use TechStore\Http\Controllers\Controller;
use TechStore\Http\Resources\OrderResource;
use TechStore\Models\Order;

class OrderController extends Controller
{
    public function view(Request $request, Order $order)
    {
        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) abort(403);

        Stripe::setApiKey(config('services.stripe.secret'));

        $items = Session::allLineItems($order->stripe_session_id, [
            'expand' => ['data.price.product'],
        ]);

        return new OrderResource($order, $items);
    }
}
