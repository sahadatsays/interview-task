<?php

namespace App\Jobs;

use App\Scraper\Scraper;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ScrapingJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $task;

    /**
     * Create a new job instance.
     */
    public function __construct($task)
    {
        $this->task = $task;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $sourceSelectos = $this->task->source_selectors;
        $sourceSelectos['ref_selector'] = $this->task->ref_selector;
        $result = Scraper::scraper($this->task->url, $sourceSelectos);
        if (count($result) > 0) {
            $this->task->update(['result' => $result]);
        }

        $this->task->update(['processing' => false]);
    }
}
