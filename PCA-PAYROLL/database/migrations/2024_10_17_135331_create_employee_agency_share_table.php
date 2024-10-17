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
        Schema::create('employee_agency_share', function (Blueprint $table) {
            $table->string('agency_share_code')->primary(); // PK
            $table->string('agency_share_name');
            $table->string('shorthand');
            $table->decimal('agency_share_amount',10,2);
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
        Schema::dropIfExists('employee_agency_share');
    }
};
