<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class EmployeePageController extends Controller{
    public function myDTR(): Response
    {
        return Inertia::render('Payroll/Employee/MyDTR');
    }

    public function myPayslip(): Response
    {
        return Inertia::render('Payroll/Employee/MyPayslip');
    }

    public function dashboard(): Response
    {
        return Inertia::render('Payroll/Employee/Dashboard');
    }
}