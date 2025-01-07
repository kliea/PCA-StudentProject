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
        Schema::create('applied_compensations', function (Blueprint $table) {
            $table->id('app_comp_code');
            $table->double('amount');
            $table->foreignId('employee_code')->constrained('employees')->references('employee_code');
            $table->foreignId('compensation_code')->constrained('compensation_types')->references('compensation_code');
            $table->foreignId('payroll_sheet_code')->constrained('payroll_sheets')->references('payroll_sheet_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_compensations');
    }
};
