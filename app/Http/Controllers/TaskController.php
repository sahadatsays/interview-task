<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Task::query()->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'url' => 'nullable|string',
            'source_type' => 'nullable|string',
            'ref_selector' => 'nullable|string',
            'country' => 'required|string',
            'document' => 'required|string',
            'enabled' => ['boolean', 'required']
        ]);
        $source_selector = [
            'title' => $request->source_title,
            'link' => $request->source_link,
            'description' => $request->source_description,
            'remove_text_from_date' => $request->source_remove_text_from_date,
            'date_format' => $request->source_date_format
        ];

        $document_selector = [
            'title' => $request->document_title,
            'link' => $request->document_link,
            'description' => $request->document_description,
            'remove_text_from_date' => $request->document_remove_text_from_date,
            'date_format' => $request->document_date_format
        ];

        $task = Task::create([
            'name' => $request->name,
            'url' => $request->url,
            'ref_selector' => $request->ref_selector,
            'country' => $request->country,
            'document' => $request->document,
            'enabled' => $request->enabled,
            'document_selectors' => json_encode($document_selector),
            'source_selectors' => json_encode($source_selector)
        ]);
        return response()->json(['data' => $task, 'status' => true]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
