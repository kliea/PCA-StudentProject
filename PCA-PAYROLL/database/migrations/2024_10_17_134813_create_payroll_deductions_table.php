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
        Schema::create('payroll_deductions', function (Blueprint $table) {
            $table->string('payroll_deductions_code')->primary(); // PK
            $table->decimal('amount', 10,2);
            $table->text('remarks');

            //foreign keys
            $table->string('deduction_code')->references('deduction_code')->on('employee_deductions');
            $table->string('payroll_code')->references('payroll_code')->on('payrolls');
            $table->string('borrower_code')->references('borrower_code')->on('borrow');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_deductions');
    }
};
