<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::truncate();
        // Task::factory(200)->create();
        $selectors = [
            'container' => '.blogno',
            'link' => 'a.titleblog',
            'title' => 'a.titleblog',
            'description' => 'div.para',
            'date' => 'p.date',
            'remove_text_from_date' => '',
            'date_format' => ''
        ];

        Task::create([
            'name' => 'Blog',
            'url' => 'https://webscraper.io/blog',
            'country' => 'Bangladesh',
            'document' => 'Document 1',
            'source_selectors' => json_encode($selectors),
            'enabled' => true,
            'ref_selector' => '#app-wrapper'
        ]);
    }
}
