<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DailyTimeEntry;
use App\Models\Employee;
use Inertia\Inertia;
use Inertia\Response;
use Exception;
use DateTime;

class DailyTimeEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
		/* Fetching all the entries stored within the database. */
		$allData = DailyTimeEntry::all();

		return Inertia::render('', ['data' => $allData, 'message' => 'All the DTR entries have been retrieved successfully.']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function generateNewBatch()
    {
		$currentDate = date('Y-m-d');
		$recentDate = NULL;

		try {
			$recentDate = DailyTimeEntry::latest()->first()->date;
		} catch (Exception $e) {
			$recentDate = (new DateTime())->setTimestamp(0);
		}

		/* Checking to see if today matches the most recent DTR entry. */
		if ($recentDate == $currentDate) {
			return;
		}

		$employees = Employee::all();

		if (sizeof($employees) == 0) {
			return;
		}

		/* Creating a new DTR entry for the day, for every employee. */
		foreach ($employees as $employee) {
			DailyTimeEntry::create([
				'dtr_entry_code' => 1,
				'date' => $currentDate,
				'time_in_am' => null,
				'time_out_am' => null,
				'time_in_pm' => null,
				'time_out_pm' => null,
				'tardy_minutes' => 0,
				'undertime_minutes' => 0,
				'work_minutes' => 0,
				'employee_code' => $employee->employee_code
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
