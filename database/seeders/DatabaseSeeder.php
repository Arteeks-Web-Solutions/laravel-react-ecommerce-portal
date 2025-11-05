<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use TechStore\Repositories\ProductCategoryRepository;
use TechStore\Repositories\ProductRepository;

class DatabaseSeeder extends Seeder
{
    /**
     * DatabaseSeeder constructor.
     */
    public function __construct(
        private ProductRepository $productRepository,
        private ProductCategoryRepository $productCategoryRepository
    ) {}

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!config('app.demo')) return;

        $electronics = $this->productCategoryRepository->firstOrCreate(['name' => 'Electronics', 'is_demo' => true]);
        $accessories = $this->productCategoryRepository->firstOrCreate(['name' => 'Accessories', 'is_demo' => true]);
        $home = $this->productCategoryRepository->firstOrCreate(['name' => 'Home', 'is_demo' => true]);

        $this->productRepository->firstOrCreate([
            'name' => 'Premium Headphones',
            'description' => 'High-quality over-ear headphones with noise cancellation.',
            'image' => 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400',
            'price' => 199.99,
            'is_demo' => true,
            'category_id' => $electronics->id,
        ], [
            'stock' => 5,
        ]);
        $this->productRepository->firstOrCreate([
            'name' => 'Smart Watch',
            'description' => 'Feature-rich smart watch with fitness tracking.',
            'image' => 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
            'price' => 149.99,
            'is_demo' => true,
            'category_id' => $electronics->id,
        ], [
            'stock' => 75,
        ]);
        $this->productRepository->firstOrCreate([
            'name' => 'Laptop Backpack',
            'description' => 'Durable backpack with padded laptop compartment',
            'image' => 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
            'price' => 79.99,
            'is_demo' => true,
            'category_id' => $accessories->id,
        ], [
            'stock' => 200,
        ]);
        $this->productRepository->firstOrCreate([
            'name' => 'Wireless Mouse',
            'description' => 'Ergonomic wireless mouse with precision tracking',
            'image' => 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
            'price' => 79.99,
            'is_demo' => true,
            'category_id' => $electronics->id,
        ], [
            'stock' => 120,
        ]);
        $this->productRepository->firstOrCreate([
            'name' => 'USB-C Hub',
            'description' => 'Multi-port USB-C hub with HDMI and card reader',
            'image' => 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=400',
            'price' => 249.99,
            'is_demo' => true,
            'category_id' => $electronics->id,
        ], [
            'stock' => 80,
        ]);
        $this->productRepository->firstOrCreate([
            'name' => 'Desk Lamp',
            'description' => 'LED desk lamp with adjustable brightness',
            'image' => 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
            'price' => 399.99,
            'is_demo' => true,
            'category_id' => $home->id,
        ], [
            'stock' => 40,
        ]);
    }
}
