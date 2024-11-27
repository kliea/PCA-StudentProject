<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
        // User::factory()->create([
        //     'name' => 'admin',
        //     'email' => 'test@example.com',
        //     'password' => '0000',
        //     'user_level' => 'admin'

        // ]);
    }
}
