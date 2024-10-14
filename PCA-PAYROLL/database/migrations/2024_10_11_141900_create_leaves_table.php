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
        Schema::create('leaves', function (Blueprint $table) {
            $table->string('leave_order');
            $table->date('date_filed');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('type'); 
            $table->text('description');
            $table->string('status');

            // foreign key
            $table->string('approver_number')->references('employee_number')->on('employees');
            $table->string('employee_number')->references('employee_number')->on('employees');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaves');
    }
};
