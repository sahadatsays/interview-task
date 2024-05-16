<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company,
            'country' => fake()->country,
            'document' => fake()->sentence,
            'last_updated' => fake()->dateTime(),
            'enabled' => fake()->randomElement([0,1])
        ];
    }
}
