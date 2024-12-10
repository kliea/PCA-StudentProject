<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'bioadmin',
            'email' => 'admin@example.com',
            'password' => '0000'
        ]);
        DB::table('employees')->insert([
            'employee_number' => '102',
            'first_name' => 'John',
            'middle_name' => 'Michael',
            'last_name' => 'Doe',
            'name_extension' => 'Jr.',
            'salary_type' => 'Fixed',
            'salary_step' => 3,
            'device_bio_id' => '15',
            'position_code' => 1,  // assuming a position code exists for 'Manager'
            'appointment_code' => 1,  // assuming this is a standard appointment type
            'station_code' => 1  // assuming this corresponds to a station location
        ]);

        DB::table('employees')->insert([
            'employee_number' => '203',
            'first_name' => 'Klinth',
            'middle_name' => 'Elizabeth',
            'last_name' => 'Smith',
            'name_extension' => NULL,
            'salary_type' => 'Hourly',
            'salary_step' => 4,
            'device_bio_id' => '8',
            'position_code' => 1,  // assuming 'Clerk' position
            'appointment_code' => 1,  // assuming this is for a temporary appointment
            'station_code' => 1  // assuming station 1 is where this employee works
        ]);

        // User::factory()->create([
        //     'name' => 'admin',
        //     'email' => 'test@example.com',
        //     'password' => '0000',
        //     'user_level' => 'admin'

        // ]);
    }
}
