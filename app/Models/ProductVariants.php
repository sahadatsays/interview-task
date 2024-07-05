<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariants extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'variant',
        'price',
        'stock'
    ];

    /**
     * Get the product that owns the ProductVariants
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function images()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
}
