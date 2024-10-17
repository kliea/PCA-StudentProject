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
        Schema::create('borrower', function (Blueprint $table) {
            $table->string('borrower_code')->primary(); // PK
            $table->date('date_started');
            $table->date('date_ended');
            $table->decimal('monthly_paid', 10, 2);
            $table->decimal('begin_balance', 10, 2);
            $table->decimal('paid_amount', 10, 2);
            $table->decimal('balance', 10, 2);

            //foreign keys
            $table->string('employee_number')->reference('employee_number')->on('employees');
            $table->string('loan_name')->reference('loan_name')->on('loan_types');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrower');
    }
};
