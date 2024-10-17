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
        Schema::create('income_tax_table', function (Blueprint $table) {
            $table->string('income_tax_table_code')->primay(); // PK
            $table->decimal('annoual_amount_from',10,2);
            $table->decimal('annoual_amount_to',10,2);
            $table->decimal('base_amount',10,2);
            $table->decimal('tax_rate',3,2);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('income_tax_table');
    }
};
