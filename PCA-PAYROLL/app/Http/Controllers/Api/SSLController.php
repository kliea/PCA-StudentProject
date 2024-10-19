<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SSLRequest;
use App\Models\SSLModel;
use Inertia\Inertia;
use Inertia\Response;

class SSLController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function index()
    {
        // Fetch data from the database
        $ssl = SSLModel::all();

        if (!$ssl || $ssl->isEmpty()) {
            return response()->json(['message' => 'No '], 404);
        }

        return $ssl;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SSLRequest $request)
    {
        // Validate the request
        $validated = $request->validated();

        // Create a new profile record in the database
        SSLModel::create($validated);

        // Redirect back or to a specific page after saving
        return $validated;
    }


    /**
     * Display the specified resource.
     */
    public function show($salary_grade)
    {
        // Find the record by salary_grade and return it as a JSON response
        $ssl = SSLModel::where('salary_grade', $salary_grade);

        // Check if the record exists
        if (!$ssl) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        // Return the record in JSON format
        return response()->json(['message' => 'successfully stored ssl.', 'data' => $ssl]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SSLRequest $request, string $salary_grade)
    {
        // validate requets first
        $validated = $request->validated();
        $ssl = SSLModel::where('salary_grade', $salary_grade)->first();

        // Check if the record exists
        if (!$ssl) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $ssl->update($validated);
        return $ssl;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($salary_grade)
    {
        // Find the record by salary_grade
        $ssl = SSLModel::where('salary_grade', $salary_grade)->delete();

        // Check if the record exists
        if (!$ssl) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        // Return a success response
        return response()->json(['message' => 'Record deleted successfully']);
    }

}
