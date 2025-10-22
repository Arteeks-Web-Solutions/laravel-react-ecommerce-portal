<?php

namespace TechStore\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'email',
        'items',
        'shipping_name',
        'shipping_line1',
        'shipping_city',
        'shipping_postal',
        'shipping_country',
        'status',
        'stripe_session_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
            'items' => 'array',
        ];
    }
}
