<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DailyTimeEntry;
use App\Models\Employee;

class DailyTimeRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
		$currentDate = date('Y-m-d');
		$recentDate = DailyTimeEntry::latest()->first()->date;

		/* Checking to see if today matches the most recent DTR entry. */
		if ($recentDate == $currentDate) {
			return;
		}

		$employees = Employee::all();

		/* Creating a new DTR entry for the day, for every employee. */
		foreach ($employees as $employee) {
			DailyTimeEntry::create([
				'date' => $currentDate,
				'time_in_am' => null,
				'time_out_am' => null,
				'time_in_pm' => null,
				'time_out_pm' => null,
				'tardy_minutes' => 0,
				'undertime_minutes' => 0,
				'work_minutes' => 0,
				'employee_code' => $employee->code
			]);
		}

		return;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return;
    }
}
