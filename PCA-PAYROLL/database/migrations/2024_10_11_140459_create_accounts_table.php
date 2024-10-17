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
        Schema::create('accounts', function (Blueprint $table) {
            $table->string('account_code')->primary(); // PK
            $table->integer('access_level');// 1 2 or 3
            $table->string('password');// kamo nay modify unsay e-dungag dri
            $table->string('username')->unique();
            
            // foreign key
            $table->string('employee_number')->references('employee_number')->on('employees');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
