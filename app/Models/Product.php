<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'attributes',
        'choice_options',
        'colors'
    ];

    protected $casts = [
        'attributes' => 'array',
        'choice_options' => 'array',
        'colors' => 'array'
    ];

    /**
     * Get all of the variants for the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariants::class);
    }

    public function images()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
}
