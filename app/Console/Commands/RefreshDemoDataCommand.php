<?php

namespace TechStore\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use TechStore\Repositories\OrderItemRepository;
use TechStore\Repositories\OrderRepository;
use TechStore\Repositories\ProductCategoryRepository;
use TechStore\Repositories\ProductRepository;

class RefreshDemoDataCommand extends Command
{
    protected $signature = 'demo:refresh';
    protected $description = 'Refresh demo data in the application';

    public function __construct(
        private ProductRepository $productRepository,
        private ProductCategoryRepository $categoryRepository,
        private OrderRepository $orderRepository,
        private OrderItemRepository $orderItemRepository
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        if (!config('app.demo')) {
            $this->info('Demo mode disabled, skipping refresh.');
            return 0;
        }

        DB::transaction(function () {
            $this->orderRepository->whereHas('items.product', function ($q) {
                $q->where('is_demo', false);
            })->delete();

            $this->productRepository->deleteWhere(['is_demo' => false], true);
            $this->categoryRepository->deleteWhere(['is_demo' => false], true);
        });

        $this->call('db:seed', ['--class' => 'DatabaseSeeder']);
        $this->info('Demo data refreshed successfully.');

        return 0;
    }
}
