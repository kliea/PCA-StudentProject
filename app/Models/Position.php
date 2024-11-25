<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
	protected $fillable = [
		'position_code',
		'position_title',
		'salary_grade_code'
	];

	public function salaryGrade() {
		return $this->belongsTo(SalaryGrade::class);
	}

	public function employee() {
		return $this->hasMany(Employee::class);
	}
}
