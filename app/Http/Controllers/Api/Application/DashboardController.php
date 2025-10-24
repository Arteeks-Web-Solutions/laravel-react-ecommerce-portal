<?php

namespace TechStore\Http\Controllers\Api\Application;

use TechStore\Http\Controllers\Controller;
use TechStore\Http\Resources\StatisticResource;
use TechStore\Models\Order;
use TechStore\Models\OrderItem;
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
            'total_revenue' => number_format(OrderItem::sum('price'), 2, '.', ''),
            'products_count' => Product::count(),
            'recent_orders' => Order::latest()->with('items')->take(5)->get(),
            'top_products' => ($ids = OrderItem::select('product_id')->selectRaw('SUM(quantity) as total_qty')->groupBy('product_id')->orderByDesc('total_qty')->take(5)->pluck('product_id')->toArray()) ? Product::whereIn('id', $ids)->orderByRaw('FIELD(id,' . implode(',', $ids) . ')')->get() : collect(),
        ]);
    }
}
