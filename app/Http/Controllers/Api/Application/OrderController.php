<?php

namespace TechStore\Http\Controllers\Api\Application;

use Illuminate\Http\Resources\Json\ResourceCollection;
use TechStore\Http\Controllers\Controller;
use TechStore\Http\Requests\Api\Application\Orders\UpdateOrderRequest;
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
     * Display a listing of all orders.
     */
    public function index(): ResourceCollection
    {
        return OrderResource::collection($this->orderRepository->all()->load('items')->reverse());
    }

    /**
     * Update the specified order.
     */
    public function update(UpdateOrderRequest $request, Order $order): Order
    {
        return $this->orderRepository->update($order->id, ['status' => $request->input('status')]);
    }
}
