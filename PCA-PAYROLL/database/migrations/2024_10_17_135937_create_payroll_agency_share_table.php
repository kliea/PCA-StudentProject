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
        Schema::create('payroll_agency_share', function (Blueprint $table) {
            $table->string('payroll_agency_share_code')->primary();
            $table->decimal('amount',10,2);

            // foreign keys
            $table->string('agency_share_code')->references('agency_share_code')->on('employee_agency_share');
            $table->string('payroll_code')->references('payroll_code')->on('payrolls');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_agency_share');
    }
};
