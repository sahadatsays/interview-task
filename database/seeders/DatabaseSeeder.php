<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Document;
use App\Models\DocumentDiff;
use App\Models\DocumentUser;
use App\Models\DocumentVersion;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        User::truncate();
        Document::truncate();
        DocumentVersion::truncate();
        DocumentUser::truncate();
        DocumentDiff::truncate();
        Schema::enableForeignKeyConstraints();

        User::factory(300)->create();
        User::factory(100)->create(['role' => 'client']);

        Document::factory(1200)->create();
        DocumentVersion::factory(2500)->create();
        DocumentUser::factory(8400)->create();
    }
}
