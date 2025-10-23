<?php

namespace TechStore\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use LaravelDaily\Invoices\Classes\Buyer;
use LaravelDaily\Invoices\Classes\InvoiceItem;
use LaravelDaily\Invoices\Invoice;
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

    /**
     * Download the invoice for a specified order.
     */
    public function downloadInvoice(Request $request, Order $order)
    {
        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) abort(403);

        $customer = new Buyer([
            'name' => $order->shipping_name,
            'address' => $order->shipping_line1 . ', ' . $order->shipping_city . ', ' . $order->shipping_postal . ', ' . $order->shipping_country,
            'custom_fields' => [
                'email' => $order->email,
            ],
        ]);

        $items = [];
        foreach ($order->items as $orderItem) {
            $items[] = (new InvoiceItem())
                ->title($orderItem->product_name)
                ->pricePerUnit($orderItem->price / $orderItem->quantity)
                ->quantity($orderItem->quantity);
        }

        $invoice = Invoice::make()
            ->buyer($customer)
            ->addItems($items)
            ->sequence($order->id)
            ->date($order->created_at)
            ->notes('Paid on: ' . $order->created_at->toFormattedDateString())
            ->save('public');

        return $invoice->download('invoice_' . $order->id . '.pdf');
    }
}
