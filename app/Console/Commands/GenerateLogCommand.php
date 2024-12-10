<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Libraries\ZKLibrary;
use App\Models\DailyTimeEntry;
use App\Models\Employee;
use DateTime;
use Exception;


class GenerateLogCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add logs from the device to db';
    protected $zk;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->zk = new ZKLibrary(env('BIOM_IP'), env('BIOM_PORT'));

        $currentDate = date('Y-m-d');
        $recentDate = DailyTimeEntry::latest()->first()->date ?? null;

        /* Checking if today matches the most recent DTR entry */
        if ($recentDate == $currentDate) {
            return;
        }

        // date_default_timezone_set("Asia/Manila");
        // $t = date("Y-m-d, H:i:s");

        try {
            $this->zk->connect();
            $this->zk->disableDevice();
            // $this->zk->setTime($t);


            // Fetch all logs from the device
            $logs = $this->zk->getAttendance();

            // Time range boundaries
            $morningStart = new DateTime('08:00:00');
            $morningEnd = new DateTime('12:00:00');
            $afternoonStart = new DateTime('13:00:00');
            $afternoonEnd = new DateTime('17:00:00');

            foreach ($logs as $log) {
                try {
                    // Extract log details
                    $device_bio_id = $log[1];
                    $logDateTime = new DateTime($log[3]);
                    $logTime = $logDateTime->format('H:i:s');
                    $logDate = $logDateTime->format('Y-m-d');
                    $logType = $log[2]; // 0, 1, 4, 5

                    // Find the employee by number
                    $employee = Employee::where('device_bio_id', $device_bio_id)->first();

                    if (!$employee) {
                        throw new Exception("Employee with device bio id: {$device_bio_id} not found.");
                    }

                    // Find or create the time entry for this employee on this date
                    $timeEntry = DailyTimeEntry::firstOrNew([
                        'date' => $logDate,
                        'employee_code' => $employee->employee_code
                    ]);

                    // Set default values for required fields
                    if (!$timeEntry->exists) {
                        // $timeEntry->tardy_minutes = 1; // Default value
                        // $timeEntry->undertime_minutes = 0;
                        $timeEntry->work_minutes = 0;
                        $timeEntry->overtime_minutes = 0;
                    }
                    

                    // For calculations
                    $timeDiff = null;
                    $tardyMins = null;
                    $undertimeMins = null;

                    // Determine the field to update based on the log type and time
                    if (in_array($logType, [0, 4])) { // Time in
                        if ($logTime >= $morningStart->format('H:i:s') && $logTime <= $morningEnd->format('H:i:s')) {
                            $timeEntry->time_in_am = $logTime;
                            $timeDiff = date_diff($morningStart, $logDateTime);
                            $tardyMins += $timeDiff->h * 60;
                            $tardyMins += $timeDiff->i;
                            $timeEntry->tardy_minutes = $tardyMins;

                        } elseif ($logTime >= $afternoonStart->format('H:i:s') && $logTime <= $afternoonEnd->format('H:i:s')) {
                            $timeEntry->time_in_pm = $logTime;
                            $timeDiff = date_diff($afternoonStart, $logDateTime);
                            $tardyMins += $timeDiff->h * 60;
                            $tardyMins += $timeDiff->i;
                            $timeEntry->tardy_minutes += $tardyMins;
                        }
                    } elseif (in_array($logType, [1, 5])) { // Time out
                        if ($logTime >= $morningStart->format('H:i:s') && $logTime <= $morningEnd->format('H:i:s')) {
                            $timeEntry->time_out_am = $logTime;
                            $timeDiff = date_diff($logDateTime, $morningEnd);
                            $undertimeMins += $timeDiff->h * 60;
                            $undertimeMins += $timeDiff->i;
                            $timeEntry->undertime_minutes += $undertimeMins;
                            
                        } elseif ($logTime >= $afternoonStart->format('H:i:s') && $logTime <= $afternoonEnd->format('H:i:s')) {
                            $timeEntry->time_out_pm = $logTime;
                            $timeDiff = date_diff($logDateTime, $afternoonEnd);
                            $undertimeMins += $timeDiff->h * 60;
                            $undertimeMins += $timeDiff->i;
                            $timeEntry->undertime_minutes += $undertimeMins;
                        }
                    }

                    // Save the time entry
                    $timeEntry->save();
                } catch (Exception $e) {
                    // Log errors for this specific log entry
                    echo "Error processing log entry: " . $e->getMessage() . "\n";
                    continue;
                }
            }

            $this->zk->enableDevice();
            $this->zk->disconnect();
        } catch (Exception $e) {
            // Handle connection or device-related errors
            echo "Device error: " . $e->getMessage() . "\n";
        }

        return;
    }
}
