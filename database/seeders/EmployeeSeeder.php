<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
		DB::table('positions')->insert([
			[
				'position_title' => 'Hamlet',
				'salary_grade_code' => 1
			]
		]);

		DB::table('appointments')->insert([
			[
				'appointment_type' => 'theater',
				'has_mandatory_deduction' => true,
				'basic_pay_type' => 'something',
				'tax_type' => 'something else'
			]
		]);

		DB::table('stations')->insert([
			[
				'station_name' => 'McNuggets'
			]
		]);

		DB::table('employees')->insert([
			[
				'employee_number' => '123',
				'first_name' => 'Juan',
				'middle_name' => NULL,
				'last_name' => 'Cruz',
				'name_extension' => NULL,
				'salary_type' => 'Regular',
				'salary_step' => 1,
				'device_bio_id' => '9',
				'position_code' => 1,
				'appointment_code' => 1,
				'station_code' => 1
			]
		]);
    }
}
