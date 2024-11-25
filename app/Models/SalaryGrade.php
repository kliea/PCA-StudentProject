<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalaryGrade extends Model
{
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'salary_grades';

	/**
	 * The primary key associated with the table.
	 *
	 * @var string
	 */
	protected $primaryKey = 'salary_grade_code';

	protected $fillable = [
		'grade',
		'step1',
		'step2',
		'step3',
		'step4',
		'step5',
		'step6',
		'step7',
		'step8'
	];

	public function position()
	{
		return $this->hasMany(Position::class);
	}
}
