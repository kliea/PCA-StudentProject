<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DeductionType;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class DeductionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Fetch data from the database
        $data = DeductionType::all();

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/Deductions', ['data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'deduction_name' => 'required|string',
            'shorthand' => 'required|string',
            'amount' => 'required|numeric',
            'is_mandatory' => 'required|boolean',
            'remittance_percent' => 'required|numeric',
            'ceiling_amount' => 'required|numeric',
            'compensation_links' => 'nullable|string'
        ]);

        // Create a new profile record in the database
        DeductionType::create([
            'deduction_name' => $validated['deduction_name'],
            'shorthand' => $validated['shorthand'],
            'amount' => $validated['amount'],
            'is_mandatory' => $validated['is_mandatory'],
            'remittance_percent' => $validated['remittance_percent'],
            'ceiling_amount' => $validated['ceiling_amount'],
            'compensation_links' => $validated['compensation_links']
        ]);

        // Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $deduction_code)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'deduction_name' => 'required|string',
            'shorthand' => 'required|string',
            'amount' => 'required|numeric',
            'is_mandatory' => 'required|boolean',
            'remittance_percent' => 'required|numeric',
            'ceiling_amount' => 'required|numeric'
        ]);

        DeductionType::where('deduction_code', $deduction_code)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored ssl');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($deduction_code)
    {
        // Find the record by salary_grade
        DeductionType::where('deduction_code', $deduction_code)->delete();
        return redirect()->back()->with('success', 'Successfully deleted ssl');
    }
}
