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
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id('leave_request_code');

            $table->foreignId('employee_code')->constrained('employees')->references('employee_code');
            $table->foreignId('approver_code')->constrained('employees')->references('employee_code');

            $table->string('type');
            $table->string('description')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->date('file_date');
            $table->boolean('is_approved')->default('false');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
