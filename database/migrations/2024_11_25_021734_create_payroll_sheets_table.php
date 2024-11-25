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
        Schema::create('payroll_sheets', function (Blueprint $table) {
            $table->id('payroll_sheet_code');

			$table->string('payroll_name');
			$table->string('payroll_type');
			$table->date('start_date');
			$table->date('end_date');
			$table->date('date_created');
			$table->date('date_posted');
			$table->date('date_paid');
			$table->string('prepared_by');
			$table->string('recommended_by');
			$table->string('certified_by');
			$table->string('approved_by');

			/* There is no need to record the employee numbers or codes of the signatories. */

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_sheets');
    }
};
