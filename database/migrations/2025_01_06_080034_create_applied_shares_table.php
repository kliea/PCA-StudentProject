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
        Schema::create('applied_shares', function (Blueprint $table) {
            $table->id('applied_share_code');

            $table->foreignId('employee_code')->constrained('employees')->references('employee_code');
            $table->foreignId('agency_share_code')->constrained('agency_shares')->references('agency_share_code');
            $table->foreignId('payroll_sheet_code')->constrained('payroll_sheets')->references('payroll_sheet_code');

            $table->double('amount')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_shares');
    }
};
