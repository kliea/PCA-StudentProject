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
        Schema::create('stations', function (Blueprint $table) {
            $table->id('station_code');

			/* The stations themselves may have specific addresses;
				but these may be unimportant and/or empty. */

			$table->string('name');
			$table->string('street_address');
			$table->string('barangay');
			$table->string('city');
			$table->string('province');
			$table->integer('postal_code', false, true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stations');
    }
};
