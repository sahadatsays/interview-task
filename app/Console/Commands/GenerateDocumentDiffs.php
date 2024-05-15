<?php

namespace App\Console\Commands;

use App\Models\Document;
use App\Models\DocumentDiff;
use Illuminate\Console\Command;
use SebastianBergmann\Diff\Differ;
use SebastianBergmann\Diff\Output\UnifiedDiffOutputBuilder;

class GenerateDocumentDiffs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-document-diffs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate document diffs for clients';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $activeDocuments = Document::where('status', 'active')->get();
        $builder = new UnifiedDiffOutputBuilder(
            "--- Original\n+++ New\n", // custom header
            false                      // do not add line numbers to the diff
        );
        $differ = new Differ($builder);

        foreach ($activeDocuments as $document) {
            $latestVersion = $document->versions()->latest()->first();
            $document->users()->where('status', 'active')->each(function ($user) use ($document, $latestVersion, $differ) {
                $lastViewedVersion = $user->pivot->last_viewed_version;

                if ($latestVersion != null) {
                    if ($lastViewedVersion < $latestVersion->version) {
                        $previousVersion = $document->versions()->where('version', $lastViewedVersion)->first();
                        if ($previousVersion) {
                            $diff = [
                                'introduction' => $differ->diff($previousVersion->body_content['introduction'], $latestVersion->body_content['introduction']),
                                'facts' => $differ->diff($previousVersion->body_content['facts'], $latestVersion->body_content['facts']),
                                'summary' => $differ->diff($previousVersion->body_content['summary'], $latestVersion->body_content['summary']),
                            ];

                            DocumentDiff::create([
                                'document_id' => $document->id,
                                'user_id' => $user->id,
                                'version' => $latestVersion->version,
                                'diff_content' => json_encode($diff),
                            ]);
                        }
                    }
                }
            });
        }

        $this->info('Document diffs generated successfully!');
    }
}
