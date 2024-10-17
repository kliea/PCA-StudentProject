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
        Schema::create('employee_deductions', function (Blueprint $table) {
             $table->string('deduction_code')->primary(); //PK
             $table->string('deduction_name');
             $table->string('shorthand');
             $table->decimal('deduction_amount',10,2);
             $table->boolean('is_mandatory')->default(false);
             $table->decimal('percent',10,2);
             $table->decimal('ceiling_amount',10,2);
             
            //foreign key
            $table->string('compensation_link')->reference('employee_code')->on('employee_compensations');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_deductions');
    }
};
