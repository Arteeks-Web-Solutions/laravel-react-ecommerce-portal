<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->string('email');
            $table->json('items');
            $table->string('shipping_name');
            $table->string('shipping_line1');
            $table->string('shipping_city');
            $table->string('shipping_postal');
            $table->string('shipping_country');
            $table->string('status')->default('pending');
            $table->string('stripe_session_id');
            $table->timestamps();
        });

        // Set the starting value for the auto-incrementing ID
        DB::statement('ALTER TABLE orders AUTO_INCREMENT = 1000;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
