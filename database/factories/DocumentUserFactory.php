<?php

namespace Database\Factories;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DocumentUser>
 */
class DocumentUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'document_id' => Document::inRandomOrder()->first()->id,
            'user_id' => User::inRandomOrder()->author()->first()->id,
            'last_viewed_version' => random_int(0, 20),
        ];
    }
}
