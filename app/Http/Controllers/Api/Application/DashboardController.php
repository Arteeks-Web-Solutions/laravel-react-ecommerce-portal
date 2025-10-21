<?php

namespace TechStore\Http\Controllers\Api\Application;

use TechStore\Http\Controllers\Controller;
use TechStore\Http\Resources\StatisticResource;
use TechStore\Models\Order;
use TechStore\Models\Product;
use TechStore\Models\User;

class DashboardController extends Controller
{
    /**
     * Display application dashboard statistics.
     */
    public function index(): StatisticResource
    {
        return new StatisticResource([
            'customers_count' => User::where('is_admin', false)->count(),
            'orders_count' => Order::count(),
            'total_revenue' => number_format(Order::all()->flatMap(fn($order) => collect($order->items))->sum('price'), 2),
            'products_count' => Product::count(),
            'recent_orders' => Order::latest()->take(5)->get(),
            'top_products' => Product::whereIn('id', $ids = Order::all()->flatMap->items->groupBy('product_id')->map(fn($g, $id) => ['id' => (int)$id, 'qty' => $g->sum('quantity')])->sortByDesc('qty')->take(5)->values()->pluck('id')->toArray())->orderByRaw('FIELD(id,' . implode(',', $ids) . ')')->get(),
        ]);
    }
}
