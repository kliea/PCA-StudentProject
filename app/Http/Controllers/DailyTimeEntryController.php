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
	/* Retrieves all the current DTRs within the system. */
    public function index(): Response {
		/* Fetching all the entries stored within the database. */
		$allData = DailyTimeEntry::all();

		/* Returning a success message to the user. */
		return Inertia::render('Payroll/Admin/DTR', ['data' => $allData, 'message' => 'All the DTR entries have been retrieved successfully.']);
    }

    /* Generates a new batch of empty DTRs for all the employees in the system.
		If there are no employees, or if the date has not changed, then a new batch is not made. */
    public function generateNewBatch() {
		$currentDate = date('Y-m-d');
		$recentDate = NULL;

		/* Attempting to retrieve the latest daily_time_entries record. */
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

	/* Creates and stores a single new daily_time_entries record. */
	public function store(Request $request) {
		/* Validating the request entries. */
		$validatedRequest = $request;

		/* Creating a new record.
			The dtr_entry_code is automatically formed upon creation. */
		DailyTimeEntry::create([
			'date' => date('Y-m-d'),
			'time_in_am' => $validatedRequest['time_in_am'],
			'time_out_am' => $validatedRequest['time_out_am'],
			'time_in_pm' => $validatedRequest['time_in_pm'],
			'time_out_pm' => $validatedRequest['time_out_pm'],
			'tardy_minutes' => $validatedRequest['tardy_minutes'],
			'undertime_minutes' => $validatedRequest['undertime_minutes'],
			'work_minutes' => $validatedRequest['work_minutes'],
			'employee_code' => $validatedRequest['employee_code']
		]);

		/* Returning a success message to the user. */
		return redirect()->back()->with('success', 'The new DTR entry was successfully saved.');
	}

    /* Displays a single DTR entry. */
    public function show(int $dtr_entry_code)
    {
		return DailyTimeEntry::where('dtr_entry_code', $dtr_entry_code);
    }

    /* Updates a single DTR entry. */
    public function update(Request $request, int $dtr_entry_code)
    {
		/* Validating the request entries. */
		$validatedRequest = $request;

		/* Finding and updating the record within the database. */
		DailyTimeEntry::where('dtr_entry_code', $dtr_entry_code)->update($validatedRequest);

		/* Returning a success message to the user. */
        return redirect()->back()->with('success', 'Successfully updated your chosen DTR entry.');
    }

    /* Deletes a single DTR entry. */
    public function destroy(int $dtr_entry_code)
    {
        /* Finding and deleting the record within the database. */
        DailyTimeEntry::where('dtr_entry_code', $dtr_entry_code)->delete();

		/* Returning a success message to the user. */
        return redirect()->back()->with('success', 'Successfully deleted your chosen DTR entry.');
    }
}
