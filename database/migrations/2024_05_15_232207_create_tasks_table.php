<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url')->nullable();
            $table->string('source_type')->nullable();
            $table->string('ref_selector')->nullable();
            $table->string('country');
            $table->string('document');
            $table->dateTime('last_updated')->default(now());
            $table->boolean('enabled');
            $table->json('document_selectors')->nullable();
            $table->json('source_selectors')->nullable();
            $table->boolean('processing')->default(false);
            $table->json('result')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
