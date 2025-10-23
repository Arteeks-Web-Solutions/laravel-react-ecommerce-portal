<?php

namespace TechStore\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use TechStore\Http\Controllers\Controller;
use TechStore\Http\Resources\OrderResource;
use TechStore\Models\Order;
use TechStore\Repositories\OrderRepository;

class OrderController extends Controller
{
    /**
     * OrderController constructor.
     */
    public function __construct(
        private OrderRepository $orderRepository,
    ) {}

/**
     * Display a listing of the user's orders.
     */
    public function index(Request $request): ResourceCollection
    {
        return OrderResource::collection($this->orderRepository->getUserOrders($request->user()->id)->load('items'));
    }

    /**
     * Display a specified order.
     */
    public function view(Request $request, Order $order): OrderResource
    {
        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) abort(403);

        return new OrderResource($order->load('items'));
    }
}
