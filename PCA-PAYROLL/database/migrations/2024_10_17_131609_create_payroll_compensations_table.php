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
        Schema::create('payroll_compensations', function (Blueprint $table) {
            $table->string('payroll_compensations_code')->primary(); // PK
            $table->decimal('amount',10,2);
            $table->integer('quantity');

            //foreing keys
            $table->string('employee_number')->references('employee_number')->on('employees');
            $table->string('compensation_code')->references('compensation_code')->on('payroll_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_compensations');
    }
};
