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
        Schema::create('travel_orders', function (Blueprint $table) {
            $table->string('travel_order_code')->primary();// PK
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
        Schema::dropIfExists('travel_orders');
    }
};
