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
        Schema::create('applied_travel_orders', function (Blueprint $table) {
            $table->id('applied_travel_order_code');

			$table->foreignId('employee_code')->constrained('employees')->references('employee_code');
			$table->foreignId('approver_code')->constrained('employees')->references('employee_code');
			$table->foreignId('travel_order_code')->constrained('travel_orders')->references('travel_order_code');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_travel_orders');
    }
};
