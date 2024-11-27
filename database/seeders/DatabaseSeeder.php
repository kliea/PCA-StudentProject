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
        $faker = Faker::create();

        // Insert multiple records into `agency_shares`
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
