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
        Schema::create('employee_compensations', function (Blueprint $table) {
            $table->string('compensation_code')->primary();
            $table->string('compensation_name');
            $table->string('shorthand');
            $table->integer('quantity');
            $table->decimal('compensation_amount',10,2);
            $table->boolean('is_taxable')->default(false);
            $table->boolean('is_fixedamount')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_compensations');
    }
};
