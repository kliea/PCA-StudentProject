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
        Schema::create('deduction_types', function (Blueprint $table) {
            $table->id('deduction_code');

            $table->string('name')->unique();
            $table->string('shorthand')->unique()->nullable();

            $table->boolean('is_mandatory');
            $table->string('compensation_link')->nullable();
            $table->double('fixed_amount')->nullable();
            $table->double('remittance_percent')->nullable();
            $table->double('ceiling_amount')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deduction_types');
    }
};
