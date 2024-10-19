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
            return response()->json(['message' => 'No Data Found in SSL.'], 404);
        }

        return $ssl;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SSLRequest $request)
    {
        $validated = $request->validated();

        // Check if a record with the same data already exists
        $existingRecord = SSLModel::where('salary_grade', $validated['salary_grade'])->first();

        if ($existingRecord) {
            return response()->json(['message' => 'Record already exists'], 409);
        }

        // If the record doesn't exist, create a new profile record in the database
        $data = SSLModel::create($validated);

        // Return or redirect after saving
        return response()->json(['message' => 'Record created successfully', 'data' => $data], 201);
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
        $ssl = SSLModel::where('salary_grade', $salary_grade)->update($validated);

        // Check if the record exists
        if (!$ssl) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $data = SSLModel::where('salary_grade', $salary_grade)->first();

        return response()->json(['message' => 'successfully stored ssl.', 'data' => $data]);
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
