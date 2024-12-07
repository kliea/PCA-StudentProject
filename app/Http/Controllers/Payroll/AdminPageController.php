<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\SalaryGrade;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Payroll/Admin/Dashboard');
    }

    public function compensations(): Response
    {
        return Inertia::render('Payroll/Admin/Compensations');
    }

    public function format(): Response
    {
        return Inertia::render('Payroll/Admin/Formats');
    }

    public function governmentshare(): Response
    {
        return Inertia::render('Payroll/Admin/GovernmentShares');
    }

    public function loans(): Response
    {
        return Inertia::render('Payroll/Admin/Loans');
    }
    public function payrolls(): Response
    {
        return Inertia::render('Payroll/Admin/Payrolls');
    }
    public function dashboardb(): Response
    {
        return Inertia::render('BioAdmin/Dashboard');
    }
    public function attendancelist(): Response
    {
        return Inertia::render('BioAdmin/AttendanceList');
    }

    public function attendancerecords(): Response
    {
        return Inertia::render('BioAdmin/AttendanceRecord');
    }

    public function manageusers(): Response
    {
        return Inertia::render('BioAdmin/ManageUsers');
    }


    public function ssl(): Response
    {
        // Fetch data from the database
        $data = SalaryGrade::all();

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/Ssl', ['data' => $data, 'message' => 'hello']);
    }

    public function ssl_addData(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'salary_grade' => 'required|numeric|unique:salary_standard_law|min:0',
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
            'salary_grade' => $validated['salary_grade'],
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

    public function update(Request $request, SalaryGrade $salary_grade)
    {
        // Return success response or redirect
        // return Inertia::render('Admin/Ssl', ['message' => $salary_grade]);
        return Inertia::render('Payroll/Admin/Ssl', ['message' => $salary_grade]);
    }
}
