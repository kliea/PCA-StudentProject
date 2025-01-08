<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Employee;
use App\Models\Position;
use App\Models\SalaryGrade;
use App\Models\Station;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
        /**
         * Display a listing of the resource.
         */
        public function index(): Response
        {
            $data = DB::select("
            SELECT
                e.employee_code,
                e.first_name,
                e.middle_name,
                e.last_name,
                p.title,
                p.salary_grade,
                e.salary_step,
                CASE
                    WHEN e.salary_step = '1' THEN sg.step1
                    WHEN e.salary_step = '2' THEN sg.step2
                    WHEN e.salary_step = '3' THEN sg.step3
                    WHEN e.salary_step = '4' THEN sg.step4
                    WHEN e.salary_step = '5' THEN sg.step5
                    WHEN e.salary_step = '6' THEN sg.step6
                    WHEN e.salary_step = '7' THEN sg.step7
                    WHEN e.salary_step = '8' THEN sg.step8
                    ELSE NULL
                END AS salary
            FROM
                employees AS e
            JOIN
                positions AS p ON e.employee_code = p.employee_code
            JOIN
                salary_grades AS sg ON sg.grade = e.salary_step
        ");

        // dd($data);
        return Inertia::render('Payroll/Admin/EmployeesPage', ['data' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    //  TODO: SA PAG UPDATE SA MGA DAPAT NAKA UNIQUE LIKE SHORTHAND DAPAT MA ADDRESS
    public function update(Request $request, $employee_code)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'title' => 'required|string',
            'appointment_type' => 'required|string',
            'position' => 'required|string',
            'salary_step' => 'required|numeric|min:0',
            'station' => 'required|string'
        ]);

        // dd($request->title);
        DB::update("
            UPDATE employees e
            JOIN positions p ON p.employee_code = e.employee_code
            JOIN appointment a ON a.appointment_code = e.appointment_code
            JOIN applied_stations as ON as.employee_code = e.employee_code
            JOIN stations s ON s.station_code = as.station_code
            SET
                e.station = ?,
                a.appointment_type = ?,
                p.title = ?,
                s.name = ?,
                e.salary_step = ?
            WHERE e.employee_code = ?
        ", [
            $request->station,
            $request->appointment_type,
            $request->title,
            $request->station,
            $request->salary_step,
            $employee_code
        ]);

        Employee::where('employee_code', $employee_code)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored Employee');
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

    // custom query function
    public function get_employee_data()
    {
        $data = DB::select("
        SELECT
            e.employee_code,
            e.first_name,
            e.middle_name,
            e.last_name,
            p.title,
            p.salary_grade,
            e.salary_step,
            CASE
                WHEN e.salary_step = '1' THEN sg.step1
                WHEN e.salary_step = '2' THEN sg.step2
                WHEN e.salary_step = '3' THEN sg.step3
                WHEN e.salary_step = '4' THEN sg.step4
                WHEN e.salary_step = '5' THEN sg.step5
                WHEN e.salary_step = '6' THEN sg.step6
                WHEN e.salary_step = '7' THEN sg.step7
                WHEN e.salary_step = '8' THEN sg.step8
                ELSE NULL
            END AS salary
        FROM
            employees AS e
        JOIN
            positions AS p ON e.employee_code = p.employee_code
        JOIN
            salary_grades AS sg ON sg.grade = e.salary_step
    ");


        dd($data); // Debugging the output


        // return Inertia::render('Payroll/Admin/Employees', [
        //     'data' => $data
        // ]);

        return response()->json([
            'data' => $data
        ]);
    }
}
