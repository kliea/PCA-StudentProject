<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SalaryGrade;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class SalaryGradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Fetch data from the database
        $data = SalaryGrade::all();

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/Ssl', ['data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'grade' => 'required|numeric|unique:salary_grades|min:0',
            'step1' => 'required|numeric|min:0',
            'step2' => 'required|numeric|min:0',
            'step3' => 'required|numeric|min:0',
            'step4' => 'required|numeric|min:0',
            'step5' => 'required|numeric|min:0',
            'step6' => 'required|numeric|min:0',
            'step7' => 'required|numeric|min:0',
            'step8' => 'required|numeric|min:0',
        ]);

        // Create a new profile record in the database
        SalaryGrade::create([
            'grade' => $validated['grade'],
            'step1' => $validated['step1'],
            'step2' => $validated['step2'],
            'step3' => $validated['step3'],
            'step4' => $validated['step4'],
            'step5' => $validated['step5'],
            'step6' => $validated['step6'],
            'step7' => $validated['step7'],
            'step8' => $validated['step8'],
        ]);

        // Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $grade)
    {
        // validate requets first
        $validated = $request->validate([
            'step1' => 'required|numeric|min:0',
            'step2' => 'required|numeric|min:0',
            'step3' => 'required|numeric|min:0',
            'step4' => 'required|numeric|min:0',
            'step5' => 'required|numeric|min:0',
            'step6' => 'required|numeric|min:0',
            'step7' => 'required|numeric|min:0',
            'step8' => 'required|numeric|min:0',
        ]);

        SalaryGrade::where('grade', $grade)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored ssl');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($grade)
    {
        // Find the record by salary_grade
        SalaryGrade::where('grade', $grade)->delete();
        return redirect()->back()->with('success', 'Successfully deleted ssl');
    }
}
