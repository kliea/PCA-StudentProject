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
        Schema::create('applied_loans', function (Blueprint $table) {
            $table->id('applied_loan_code');
            
			$table->foreignId('employee_code')->constrained('employees')->references('employee_code');
			$table->foreignId('loan_code')->constrained('loan_types')->references('loan_code');

			$table->date('start_date');
			$table->date('end_date')->nullable();
			$table->double('monthly_amount')->nullable();
			$table->double('begin_balance')->nullable();
			$table->double('amount_paid')->nullable();
            $table->double('recent_paid')->nullable();
			$table->double('current_balance');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_loans');
    }
};
