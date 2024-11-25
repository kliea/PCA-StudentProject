<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dtr_entries', function (Blueprint $table) {
            $table->id('dtr_entry_code');

			$table->date('date');
			$table->time('time_in_am');
			$table->time('time_ouu_am');
			$table->time('time_in_pm');
			$table->time('time_out_pm');
			$table->integer('tardy_minutes');
			$table->integer('undertime_minutes');
			$table->integer('work_minutes');

			$table->foreignId('dtr_code')->constrained('daily_time_records')->references('dtr_code');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dtr_entries');
    }
};
