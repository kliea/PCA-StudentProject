<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

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
    }
}
