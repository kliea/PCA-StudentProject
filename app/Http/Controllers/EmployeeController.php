<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Fetch data from the database
        $data = Employee::all();

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/Employees', ['data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'employee_number' => 'required|unique:employees|string',
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'last_name' => 'required|string',
            'name_extension' => 'required|string',
            'salary_type' => 'required|string',
            'salary_step' => 'required|numeric|min:0',
            'position_code' => 'required',
            'appointment_code' => 'required',
            'station_code' => 'required'
        ]);

        // Create a new profile record in the database
        Employee::create([
            'employee_number' => $validated['employee_number'],
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name'],
            'name_extension' => $validated['name_extension'],
            'salary_type' => $validated['salary_type'],
            'salary_step' => $validated['salary_step'],
            'position_code' => $validated['position_code'],
            'stepappointment_code' => $validated['appointment_code'],
            'station_code' => $validated['station_code'],
        ]);

        // Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $grade)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'employee_number' => 'required|unique:employees|string',
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'last_name' => 'required|string',
            'name_extension' => 'required|string',
            'salary_type' => 'required|string',
            'salary_step' => 'required|numeric|min:0',
            'position_code' => 'required',
            'appointment_code' => 'required',
            'station_code' => 'required'
        ]);

        Employee::where('grade', $grade)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored ssl');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($grade)
    {
        // Find the record by salary_grade
        Employee::where('grade', $grade)->delete();
        return redirect()->back()->with('success', 'Successfully deleted ssl');
    }
}
