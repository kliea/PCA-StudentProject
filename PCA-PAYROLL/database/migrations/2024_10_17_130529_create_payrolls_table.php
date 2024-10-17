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
        Schema::create('payrolls', function (Blueprint $table) {
            $table->string('payroll_code')->primary(); //PK

            //foreign keys
            $table->string('employee_number')->references('employee_number')->on('employees');
            $table->string('payroll_index_code')->references('payroll_index_code')->on('payroll_index');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
