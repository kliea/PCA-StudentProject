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
        Schema::create('salary_grades', function (Blueprint $table) {
            $table->id('salary_grade_code');

			/* There are eight "steps" in the salary grade.
				These should be modified every year;
				and so seeders must be refreshed every year.
				We may have to implement a system for the user to modify these. */

			$table->integer('grade', false, true)->unique();
			$table->double('step1');
			$table->double('step2');
			$table->double('step3');
			$table->double('step4');
			$table->double('step5');
			$table->double('step6');
			$table->double('step7');
			$table->double('step8');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salary_grades');
    }
};
