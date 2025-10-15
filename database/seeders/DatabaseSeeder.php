<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use TechStore\Models\ProductCategory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        ProductCategory::firstOrCreate(['name' => 'Electronics']);
        ProductCategory::firstOrCreate(['name' => 'Accessories']);
        ProductCategory::firstOrCreate(['name' => 'Home']);
    }
}
