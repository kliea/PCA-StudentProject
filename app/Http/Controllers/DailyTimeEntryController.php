<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DailyTimeEntry;
use App\Models\Employee;
use App\Libraries\ZKLibrary;
use Exception;
use DateTime;

use function PHPUnit\Framework\isEmpty;

class DailyTimeEntryController extends Controller
{
    protected $zk;

    public function __construct()
    {
        // contructor to connect the device.
        $this->zk = new ZKLibrary(env('BIOM_IP'), env('BIOM_PORT'));
    }

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

		if ($employees->isEmpty()) {
			return;
		}

		/* Creating a new DTR entry for the day, for every employee. */
		foreach ($employees as $employee) {

            $this->zk->connect();
            $this->zk->disableDevice();
            
            $logs = $this->zk->getAttendance();

            // get only the 24h format from the attendance log output from the devince

            // mornning
            $eight = (new DateTime('8:00:00'))->format('H:i:s');
            $twelve = (new DateTime('12:00:00'))->format('H:i:s'); // for tardy/undertime

            // afternoon
            $one = (new DateTime('13:00:00'))->format('H:i:s');
            $five = (new DateTime('17:00:00'))->format('H:i:s');



            foreach($logs as $log => $key)
            {
                
            }

			DailyTimeEntry::create([
				'dtr_entry_code' => 1,
				'date' => $currentDate,     //date
				'time_in_am' => null,       //time
				'time_out_am' => null,
				'time_in_pm' => null,
				'time_out_pm' => null,
				'tardy_minutes' => 0,       //int
				'undertime_minutes' => 0,
				'work_minutes' => 0,
				'employee_code' => $employee->employee_code
			]);
		}

		return;
    }
}


