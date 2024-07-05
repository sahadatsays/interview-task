<?php

namespace Tests\Unit;

use App\Models\Product;
use App\Models\ProductVariants;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function a_product_can_be_create_with_variants_and_images()
    {
        // Create a product
        $product = Product::create([
            'attributes' => ['size' => 'large', 'material' => 'cotton'],
            'choice_options' => ['color' => ['red', 'blue'], 'size' => ['S', 'M', 'L']],
            'colors' => ['#ff0000', '#0000ff'],
        ]);
        // Add images to the product
        $product->images()->createMany([
            ['url' => 'https://example.com/image1.jpg'],
            ['url' => 'https://example.com/image2.jpg'],
        ]);

        // Create product variants
        $variant1 = $product->variants()->create([
            'variant' => 'Red Large',
            'price' => 29.99,
            'stock' => 100,
        ]);

        $variant2 = $product->variants()->create([
            'variant' => 'Blue Medium',
            'price' => 25.99,
            'stock' => 50,
        ]);

        // Add images to the product variants
        $variant1->images()->createMany([
            ['url' => 'https://example.com/variant1_image1.jpg'],
            ['url' => 'https://example.com/variant1_image2.jpg'],
        ]);

        $variant2->images()->createMany([
            ['url' => 'https://example.com/variant2_image1.jpg'],
            ['url' => 'https://example.com/variant2_image2.jpg'],
        ]);

        // Assertions
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'attributes' => json_encode(['size' => 'large', 'material' => 'cotton']),
            'choice_options' => json_encode(['color' => ['red', 'blue'], 'size' => ['S', 'M', 'L']]),
            'colors' => json_encode(['#ff0000', '#0000ff']),
        ]);

        $this->assertDatabaseHas('media', [
            'mediable_type' => Product::class,
            'mediable_id' => $product->id,
            'url' => 'https://example.com/image1.jpg',
        ]);

        $this->assertDatabaseHas('product_variants', [
            'id' => $variant1->id,
            'product_id' => $product->id,
            'variant' => 'Red Large',
            'price' => 29.99,
            'stock' => 100,
        ]);

        $this->assertDatabaseHas('media', [
            'mediable_type' => ProductVariants::class,
            'mediable_id' => $variant1->id,
            'url' => 'https://example.com/variant1_image1.jpg',
        ]);
    }
}
