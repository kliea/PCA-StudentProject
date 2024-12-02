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
        Schema::create('compensation_types', function (Blueprint $table) {
            $table->id('compensation_code');
<<<<<<< HEAD

			$table->string('compensation_name')->unique();
			$table->string('shorthand')->unique();
			$table->double('amount');
			$table->boolean('is_taxable');
			$table->boolean('is_fixed');

=======
            $table->string('compensation_name');
            $table->string('shorthand');
            $table->double('amount');
            $table->boolean('is_taxable');
            $table->boolean('is_fixed');
>>>>>>> origin/AddedsheetAndSign
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compensation_types');
    }
};
