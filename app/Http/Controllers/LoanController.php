<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LoanController extends Controller
{
    //
    public function showEmployeeLoanDetails()
    {
        // Query to get employee loan details
        $loans = DB::table('employees as e')
            ->join('applied_loans as al', 'e.employee_code', '=', 'al.employee_code')
            ->join('loan_types as lt', 'al.loan_code', '=', 'lt.loan_code')
            ->select(
                'lt.loan_name',
                'e.first_name',
                'e.middle_name',
                'e.last_name',
                'e.name_extension',
                'e.employee_number',
                'al.monthly_amount',
                'al.begin_balance',
                'al.previous_paid',
                'al.paid_amount',
                'al.balance',
                'al.start_date',
                'al.end_date'
            )
            ->get();

        // Return the data to an Inertia view
        // return Inertia::render('Payroll/Admin/Loans', [
        //     'employeeDetails' => $loans,
        // ]);
        // //json
        return response()->json([
            'success' => true,
            'data' => $loans,
        ]);
    }
}
