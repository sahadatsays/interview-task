<?php

namespace App\Http\Controllers;

use App\Imports\ProductsImport;
use Illuminate\Http\Request;

class BulkProductController extends Controller
{
    public function create(Request $request)
    {
        return view('create');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'products_file' => 'required|file|mimes:csv,xls,xlsx'
        ]);

        try {
            $file = $request->file('products_file')->store('imports');
            (new ProductsImport)->import($file);
            return back()->with('success', 'File imported successfully');
        } catch (\Throwable $th) {
            return back()->withErrors(['msg' => 'Error importing file: ' . $th->getMessage() ]);
        }
    }
}
