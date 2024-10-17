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
        Schema::create('payroll_indexes', function (Blueprint $table) {
            $table->string('payroll_index_code')->primary(); //PK
            $table->string('payroll_name');
            $table->string('payroll_type');
            $table->date('starting_date');
            $table->date('ending_date');
            $table->date('date_posted');
            $table->date('date_paid');
            $table->date('date_created');
            $table->string('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_indexes');
    }
};
