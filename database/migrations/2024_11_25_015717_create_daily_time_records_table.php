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
        Schema::create('daily_time_records', function (Blueprint $table) {
            $table->id('dtr_code');

			$table->date('start_date');
			$table->date('end_date');
			$table->integer('total_tardy_minutes', false, true);
			$table->integer('total_undertime_minutes', false, true);
			$table->integer('total_work_minutes', false, true);

			$table->foreignId('employee_code')->constrained('employees')->references('employee_code');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_time_records');
    }
};
