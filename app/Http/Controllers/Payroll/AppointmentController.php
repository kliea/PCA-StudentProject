<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\CompensationType;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Fetch data from the database
        $data = Appointment::all();

        $compensationTypes = CompensationType::pluck('compensation_name');

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/Appointments', ['data' => $data, 'compensationTypes' => $compensationTypes]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'appointment_type' => 'required|unique:appointments',
            'has_mandatory_deduction' => 'required|boolean',
            'basic_pay_type' => 'required|string',
            'tax_type' => 'required|string'
        ]);

        // Create a new profile record in the database
        Appointment::create([
            'appointment_type' => $validated['appointment_type'],
            'has_mandatory_deduction' => $validated['has_mandatory_deduction'],
            'basic_pay_type' => $validated['basic_pay_type'],
            'tax_type' => $validated['tax_type'],
        ]);

        // Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $appointment_code)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'has_mandatory_deduction' => 'required|boolean',
            'basic_pay_type' => 'required|string',
            'tax_type' => 'required|string'
        ]);

        Appointment::where('appointment_code', $appointment_code)->update($validated);
        return redirect()->back()->with('success', 'Successfully updated ssl');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($appointment_code)
    {
        // Find the record by salary_grade
        Appointment::where('appointment_code', $appointment_code)->delete();
        return redirect()->back()->with('success', 'Successfully deleted ssl');
    }
}
