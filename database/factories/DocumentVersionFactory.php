<?php

namespace Database\Factories;

use App\Models\Document;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DocumentVersion>
 */
class DocumentVersionFactory extends Factory
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
            'version' => random_int(0, 20),
            'body_content' => json_encode([
                'introduction' => fake()->paragraph,
                'facts' => fake()->paragraph,
                'summary' => fake()->paragraph
            ]),
            'tags_content' => fake()->sentence,
        ];
    }
}
