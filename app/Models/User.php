<?php

namespace TechStore\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'street',
        'postal_code',
        'city',
        'country',
        'password',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    /**
     * Default values for specific fields in the database.
     */
    protected $attributes = [
        'street' => null,
        'postal_code' => null,
        'city' => null,
        'country' => null,
        'is_admin' => false,
    ];

    /**
     * Check if the user is a demo user.
     */
    public function isDemo(): bool
    {
        return ($this->email === 'demo@example.com' || $this->is_admin) && config('app.demo');
    }
}
