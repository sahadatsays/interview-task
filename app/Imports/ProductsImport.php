<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ProductsImport implements ToModel, WithHeadingRow, WithChunkReading, WithValidation, ShouldQueue
{
    use Importable;
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $validator = Validator::make($row, [
            'attributes' => 'required',
            'choice_options' => 'required',
            'colors' => 'required',
            'variant' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'product_images' => 'nullable',
            'variant_images' => 'nullable',
        ]);

        if ($validator->fails()) {
            \Log::error('Import error: ' . json_encode($validator->errors()->toArray()));
            return null;
        }

        $product = Product::where('attributes', $row['attributes'])
            ->orWhere('choice_options', $row['choice_options'])
            ->orWhere('colors', $row['colors'])
            ->first();

        if ($product) {
            $product->update([
                'attributes' => $row['attributes'],
                'choice_options' => $row['choice_options'],
                'colors' => $row['colors']
            ]);
        } else {
            $product = Product::create([
                'attributes' => $row['attributes'],
                'choice_options' => $row['choice_options'],
                'colors' => $row['colors']
            ]);
        }

        $variant = $product->variants()->create([
            'variant' => $row['variant'],
            'price' => $row['price'],
            'stock' => $row['stock']
        ]);

        /**
         * Product images
         */
        if (array_key_exists('product_images', $row)) {
            $product_images = explode(",", $row['product_images']);
            if (is_array($product_images)) {
                foreach ($product_images as $image) {
                    $path = $this->uploadImage($image);
                    if ($path) {
                        $product->images()->create(['url' => $path]);
                    }
                }
            } else {
                $path = $this->uploadImage($row['product_images']);
                if ($path) {
                    $product->images()->create(['url' => $path]);
                }
            }
        }
        /**
         * Product variant product images
         */
        if (array_key_exists('variant_images', $row)) {
            $variant_images = explode(",", $row['variant_images']);
            if (is_array($variant_images)) {
                foreach ($variant_images as $image) {
                    $path = $this->uploadImage($image, 'product-variants');
                    if ($path) {
                        $variant->images()->create(['url' => $path]);
                    }
                }
            } else {
                $path = $this->uploadImage($row['variant_images'], 'product-variants');
                if ($path) {
                    $variant->images()->create(['url' => $path]);
                }
            }
        }

        return $product;
    }

    public function chunkSize(): int
    {
        return 100;
    }

    // public function batchSize(): int
    // {
    //     return 1000;
    // }

    public function rules(): array
    {
        return [
            '*.attributes'          => 'required',
            '*.choice_options'      => 'required',
            '*.colors'              => 'required',
            '*.variant'             => 'required',
            '*.price'               => 'required',
            '*.stock'               => 'required',
        ];
    }

    public function uploadImage($link, $dir = 'products')
    {
        if ($link == null) return null;

        if (@file_get_contents($link) == false) {
            return null;
        }

        $info = pathinfo($link);
        $ext = $info['extension'] ?? null;
        if ($ext == null) {
            return null;
        }
        $fileName = str()->random(15);
        $contents = file_get_contents($link);
        $fileName = $fileName . '.' . $ext;
        $path = '/uploads/' . $dir . '/' . $fileName;
        if (Storage::disk('public')->put($path, $contents)) {
            return $path;
        }
        return null;
    }
}
