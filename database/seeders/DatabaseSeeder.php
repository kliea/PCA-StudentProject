<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use \DateTime;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // for fakeh data
        $faker = Faker::create();

        // SSL ===================================================================
        $salaryGrades = [];
        for ($grade = 1; $grade <= 33; $grade++) {
            $steps = [];
            for ($step = 1; $step <= 8; $step++) {
                if ($grade < 33 || $step <= 2) {
                    $steps["step{$step}"] = random_int(10000, 200000);
                } else {
                    $steps["step{$step}"] = 0;
                }
            }

            $steps['grade'] = $grade;
            $salaryGrades[] = $steps;
        }
        DB::table('salary_grades')->insert($salaryGrades);

        // positions ================================================================
        $positions = [];

        $jobTitles = [
            'Developer', 'Analyst', 'Coordinator', 'Specialist', 'Manager',
            'Engineer', 'Consultant', 'Technician', 'Officer', 'Administrator',
            'Planner', 'Supervisor', 'Strategist', 'Director', 'Executive',
            'Architect', 'Assistant', 'Lead', 'Trainer', 'Designer'
        ];

        for ($i = 1; $i <= 19; $i++) {
            $positions[] = [
                'position_title' => "$jobTitles[$i]",
                'salary_grade_code' => $i
            ];
        }
        DB::table('positions')->insert($positions);

        // stations =============================================================
        $stations = [];

        // Arrays for random station details
        $stationNames = [
            'Central Office', 'Regional Office', 'Field Station',
            'Research Hub', 'Monitoring Center', 'Training Facility',
            'Operational Unit', 'Administrative Wing', 'Coordination Bureau', 'Satellite Office'
        ];
        $cities = [
            'Quezon City', 'Makati City', 'Davao City', 'Cebu City',
            'Baguio City', 'Iloilo City', 'Butuan City', 'Zamboanga City',
            'General Santos City', 'Tagaytay City'
        ];
        $provinces = [
            'Metro Manila', 'Davao del Sur', 'Cebu', 'Benguet',
            'Iloilo', 'Agusan del Norte', 'Zamboanga del Sur',
            'South Cotabato', 'Cavite', 'Misamis Oriental'
        ];

        for ($i = 0; $i < 10; $i++) {
            $stations[] = [
                'station_name' => $stationNames[array_rand($stationNames)] . " " . ($i + 1),
                'street_address' => 'Street ' . random_int(1, 100) . ' ' . chr(random_int(65, 90)), // Random street (e.g., "Street 42 B")
                'barangay' => 'Barangay ' . random_int(1, 500), // Random barangay
                'city' => $cities[array_rand($cities)], // Random city from the list
                'province' => $provinces[array_rand($provinces)], // Random province from the list
                'postal_code' => random_int(8000, 8600) // Random postal code in a typical range
            ];
        }
        DB::table('stations')->insert($stations);

        $appointments = [];

        // Appointments ===========================================================================
        $appointments = [];

        // Define unique appointment types
        $uniqueAppointmentTypes = [
            'Regular', 'Contractual', 'Casual', 'Temporary',
            'Job Order', 'Part-Time', 'Internship', 'Consultant',
            'Freelance', 'Seasonal'
        ];

        $basicPayTypes = ['Basic', 'Gross', 'Net'];
        $taxTypes = ['Basic', 'Withholding', 'Exempt'];

        foreach ($uniqueAppointmentTypes as $appointmentType) {
            $appointments[] = [
                'appointment_type' => $appointmentType, // Unique appointment type
                'has_mandatory_deduction' => (bool)random_int(0, 1), // Random boolean
                'basic_pay_type' => $basicPayTypes[array_rand($basicPayTypes)], // Random basic pay type
                'tax_type' => $taxTypes[array_rand($taxTypes)] // Random tax type
            ];
        }
        DB::table('appointments')->insert($appointments);

        // Holidays ==================================================================================
        $holidays = [];
        $holidayNames = [
            'New Year\'s Day', 'Independence Day', 'Labor Day', 'Thanksgiving',
            'Christmas', 'Easter', 'Valentine\'s Day', 'Halloween',
            'Memorial Day', 'Veterans Day'
        ];
        $holiday_types = ['National', 'Religious', 'Cultural', 'Historical'];
        for ($i = 0; $i < 10; $i++) {
            $holidays[] = [
                'holiday_name' => $holidayNames[array_rand($holidayNames)], // Random holiday name
                'date' => date('Y-m-d', strtotime('2024-01-01 +' . random_int(0, 364) . ' days')), // Random date in 2024
                'type' => $holiday_types[array_rand($holiday_types)], // Random holiday type
                'is_recurring' => (bool)random_int(0, 1) // Random boolean
            ];
        }
        DB::table('holidays')->insert($holidays);

        // income_taxes ==================================================================================
        $incomeTaxes = [];

        // Generate 10 random income tax brackets
        for ($i = 0; $i < 10; $i++) {
            $lowerbound = random_int(10000, 100000); // Random lower bound
            $upperbound = $lowerbound + random_int(10000, 50000); // Ensure upper bound is higher
            $base_amount = $lowerbound * 0.1; // Base amount as 10% of lower bound
            $tax_rate = random_int(5, 30) + (random_int(0, 99) / 100); // Random tax rate between 5% and 30% with decimal

            $incomeTaxes[] = [
                'lowerbound' => $lowerbound,
                'upperbound' => $upperbound,
                'base_amount' => $base_amount,
                'tax_rate' => $tax_rate
            ];
        }
        DB::table('income_taxes')->insert($incomeTaxes);

        // employees ========================================================================
        $employees = [];
        $deviceBioIds = range(1, 100); // Assuming there are up to 100 unique device IDs
        shuffle($deviceBioIds); // Randomize the order of device IDs
        for ($i = 1; $i <= 50; $i++) { // Assuming we want to insert 50 employees
            $employees[] = [
                'employee_number' => $faker->unique()->randomNumber(5), // Unique employee number
                'first_name' => $faker->firstName,
                'middle_name' => $faker->lastName,
                'last_name' => $faker->lastName,
                'name_extension' => $faker->optional(0.1)->suffix, // 10% chance to have a name extension
                'salary_type' => $faker->randomElement(['Fixed', 'Hourly', 'Contract']),
                'salary_step' => $faker->numberBetween(1, 8),
                'device_bio_id' => array_pop($deviceBioIds), // Get a unique device_bio_id
                'position_code' => $faker->numberBetween(1, 19), // Assuming there are 33 positions
                'appointment_code' => $faker->numberBetween(1, 10), // Assuming there are 10 appointment types
                'station_code' => $faker->numberBetween(1, 10), // Assuming there are 10 stations
            ];
        }

        // Insert into the employees table
        DB::table('employees')->insert($employees);

        // leave_requests =========================================================================
        $leaveRequests = [];
        $leaveTypes = ['Sick Leave', 'Vacation Leave', 'Emergency Leave', 'Maternity Leave', 'Paternity Leave'];
        $statuses = ['Pending', 'Approved', 'Rejected'];

        for ($i = 0; $i < 10; $i++) {
            $dateFiled = $faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d');
            $startDate = $faker->dateTimeBetween($dateFiled, '+5 day')->format('Y-m-d');
            $endDate = $faker->dateTimeBetween($startDate, '+1 month')->format('Y-m-d');
            $leaveType = $faker->randomElement($leaveTypes);
            $leaveDescription = $faker->boolean(80) ? $faker->sentence() : 'N/A'; // 80% chance of having a description
            $status = $faker->randomElement($statuses);
            $employeeCode = random_int(1, 50); // Assuming there are 50 employees
            $approverCode = random_int(1, 10); // Assuming there are 10 approvers

            $leaveRequests[] = [
                'date_filed' => $dateFiled,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'leave_request_type' => $leaveType,
                'leave_request_description' => $leaveDescription,
                'leave_request_status' => $status,
                'employee_code' => $employeeCode,
                'approver_code' => $approverCode,
            ];
        }
        DB::table('leave_requests')->insert($leaveRequests);

        // travel_orders =================================================
        $travelOrders = [];

        for ($i = 1; $i <= 50; $i++) { // Generating 50 travel orders
            $startDate = $faker->dateTimeBetween('-1 year', '+1 year'); // Start date within a year from now
            $endDate = (clone $startDate)->modify('+'. $faker->numberBetween(1, 14) .' days'); // End date 1-14 days later

            $travelOrders[] = [
                'date_filed' => $faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'), // Filed within the past year
                'start_date' => $startDate->format('Y-m-d'),
                'end_date' => $endDate->format('Y-m-d'),
                'travel_order_type' => $faker->randomElement(['Work in Different Region', 'Training', 'Conference', 'Meeting']),
                'travel_order_description' => $faker->sentence,
                'travel_order_status' => $faker->randomElement(['Approved', 'Pending', 'Declined']),
                'employee_code' => $faker->numberBetween(1, 50), // Assuming there are 50 employees
                'approver_code' => $faker->numberBetween(1, 10), // Assuming there are 10 approvers
            ];
        }
        DB::table('travel_orders')->insert($travelOrders);

        // daily time entries ==================================================================
        $dailyTimeEntries = [];
        for ($i = 0; $i < 50; $i++) { // Generate 50 random daily time entries
            $date = $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d');
            $timeInAm = $faker->time('08:00:00', '10:00:00');
            $timeOutAm = (new DateTime($timeInAm))->modify('+' . $faker->numberBetween(60, 120) . ' minutes')->format('H:i:s');
            $timeInPm = $faker->time('13:00:00', '14:00:00');
            $timeOutPm = (new DateTime($timeInPm))->modify('+' . $faker->numberBetween(60, 240) . ' minutes')->format('H:i:s');
            $tardyMinutes = $faker->numberBetween(0, 30);
            $totalMinutesWorked = (strtotime($timeOutAm) - strtotime($timeInAm)) / 60 + (strtotime($timeOutPm) - strtotime($timeInPm)) / 60;
            $expectedDailyMinutes = 480; // Standard 8-hour workday
            $undertimeMinutes = max(0, $expectedDailyMinutes - $totalMinutesWorked - $tardyMinutes);

            $dailyTimeEntries[] = [
                'date' => $date,
                'time_in_am' => $timeInAm,
                'time_out_am' => $timeOutAm,
                'time_in_pm' => $timeInPm,
                'time_out_pm' => $timeOutPm,
                'tardy_minutes' => $tardyMinutes,
                'undertime_minutes' => $undertimeMinutes,
                'work_minutes' => $totalMinutesWorked,
                'employee_code' => $faker->numberBetween(1, 50), // Assuming 50 employees
            ];
        }
        DB::table('daily_time_entries')->insert($dailyTimeEntries);

        // Job orders =========================================================================
        $jobOrders = [];
        for ($i = 0; $i < 10; $i++) {
            // Random employee code (you can adjust the range based on your employee data)
            $employeeCode = $faker->numberBetween(1, 50);

            // Generate random start date between 1 month ago and today
            $startDate = $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d');

            // Generate random end date that is later than start date
            $endDate = (new DateTime($startDate))->modify('+' . $faker->numberBetween(1, 5) . ' days')->format('Y-m-d');

            $jobOrders[] = [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'employee_code' => $employeeCode
            ];
        }
        DB::table('job_orders')->insert($jobOrders);

        // Contracts=========================================================================
        $contracts = [];

        for ($i = 0; $i < 10; $i++) {
            $employeeCode = $faker->numberBetween(1, 50);
            $startDate = $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d');
            $endDate = (new DateTime($startDate))->modify('+' . $faker->numberBetween(1, 5) . ' years')->format('Y-m-d');
            $contracts[] = [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'employee_code' => $employeeCode
            ];
        }
        DB::table('contracts')->insert($contracts);

        // payroll_sheets====================================================
        $payrollSheets = [];

        for ($i = 0; $i < 10; $i++) {
            $payrollName = $faker->word . ' Payroll';
            $payrollType = $faker->randomElement(['Regular', 'Overtime', 'Bonus', 'Holiday']);
            $startDate = $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d');
            $endDate = (new DateTime($startDate))->modify('+' . $faker->numberBetween(1, 5) . ' days')->format('Y-m-d');
            $dateCreated = $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d');
            $datePosted = $faker->dateTimeBetween($dateCreated, $dateCreated)->format('Y-m-d');
            $datePaid = $faker->dateTimeBetween($datePosted, $datePosted)->format('Y-m-d');
            $preparedBy = $faker->name;
            $recommendedBy = $faker->name;
            $certifiedBy = $faker->name;
            $approvedBy = $faker->name;

            $payrollSheets[] = [
                'payroll_name' => $payrollName,
                'payroll_type' => $payrollType,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'date_created' => $dateCreated,
                'date_posted' => $datePosted,
                'date_paid' => $datePaid,
                'prepared_by' => $preparedBy,
                'recommended_by' => $recommendedBy,
                'certified_by' => $certifiedBy,
                'approved_by' => $approvedBy
            ];
        }
        DB::table('payroll_sheets')->insert($payrollSheets);

        // deduction_types==================================================
        $deductionTypes = [];

        for ($i = 0; $i < 10; $i++) {
            $deductionTypes[] = [
                'deduction_name' => $faker->word . ' Deduction',  // Random deduction name
                'shorthand' => strtoupper($faker->word),  // Random shorthand, uppercase
                'amount' => $faker->randomFloat(2, 1000, 10000),  // Random amount between 1,000 and 10,000
                'is_mandatory' => $faker->boolean,  // Random boolean value for mandatory status
                'remittance_percent' => $faker->randomFloat(2, 5, 20),  // Random remittance percent between 5% and 20%
                'ceiling_amount' => $faker->randomFloat(2, 0, 5000)  // Random ceiling amount between 0 and 5,000
            ];
        }
        DB::table('deduction_types')->insert($deductionTypes);

        // agency_shares =============================================================
        for ($i = 0; $i < 10; $i++) {
            DB::table('agency_shares')->insert([
                'agency_share_name' => $faker->company . ' Share',  // Random company share name
                'shorthand' => strtoupper($faker->lexify('??')),   // Random shorthand (2 letters)
                'amount' => $faker->randomFloat(2, 50, 500),       // Random amount (50 to 500)
                'is_mandatory' => $faker->boolean,                // Random boolean (true/false)
                'remittance_percent' => $faker->randomFloat(2, 0.01, 0.15), // Percent (0.01 to 0.15)
                'ceiling_amount' => $faker->randomFloat(2, 10, 100),  // Ceiling amount (10 to 100)
                'compensation_links' => DB::raw('ARRAY[' . implode(',', $faker->randomElements([1, 2, 3, 4, 5], 3)) . ']'), // Random 3 values from 1-5
            ]);
        }

        // loan_types
        

    }
}
