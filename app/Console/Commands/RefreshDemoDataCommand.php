<?php

namespace TechStore\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use TechStore\Repositories\ProductCategoryRepository;
use TechStore\Repositories\ProductRepository;

class RefreshDemoDataCommand extends Command
{
    protected $signature = 'demo:refresh';
    protected $description = 'Refresh demo data in the application';

    public function __construct(
        private ProductRepository $productRepository,
        private ProductCategoryRepository $categoryRepository
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        if (!config('app.demo')) {
            $this->info('Demo mode disabled, skipping refresh.');
            return 0;
        }

        // Disable FK checks temporarily
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        $this->productRepository->truncate();
        $this->categoryRepository->truncate();

        // Enable FK checks again
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // Seed categories
        $this->categoryRepository->createMany([
            [
                'name' => 'Electronics',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Home',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Accessories',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Seed products
        $this->productRepository->createMany([
            [
                'name' => 'Premium Headphones',
                'description' => 'High-quality wireless headphones with noise cancellation',
                'image' => 'https://images-ext-1.discordapp.net/external/9N0Ryb8OghePxTxBjZNLVGPgoh8_qDqMQaYmjpYDHTM/%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D400/https/images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?format=webp',
                'category_id' => 1,
                'stock' => 16,
                'price' => 299.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Smart Watch',
                'description' => 'Fitness tracking smartwatch with heart rate monitor',
                'image' => 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
                'category_id' => 1,
                'stock' => 22,
                'price' => 199.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Laptop Backpack',
                'description' => 'Durable backpack with padded laptop compartment',
                'image' => 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
                'category_id' => 3,
                'stock' => 5,
                'price' => 79.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Wireless Mouse',
                'description' => 'Ergonomic wireless mouse with precision tracking',
                'image' => 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
                'category_id' => 1,
                'stock' => null,
                'price' => 49.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'USB-C Hub',
                'description' => 'Multi-port USB-C hub with HDMI and card reader',
                'image' => 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=400',
                'category_id' => 1,
                'stock' => 43,
                'price' => 59.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Desk Lamp',
                'description' => 'LED desk lamp with adjustable brightness',
                'image' => 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
                'category_id' => 2,
                'stock' => 9,
                'price' => 39.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->info('Demo data refreshed successfully.');

        return 0;
    }
}
