<?php

namespace TechStore\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'image',
        'price',
        'stock',
        'is_demo',
        'category_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_demo' => 'boolean',
            'category_id' => 'integer',
        ];
    }

    /**
     * Default values for specific fields in the database.
     */
    protected $attributes = [
        'description' => null,
        'image' => null,
        'stock' => null,
        'is_demo' => false,
    ];

    /**
     * Get the category that this product belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }
}
