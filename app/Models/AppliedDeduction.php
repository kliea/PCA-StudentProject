<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedDeduction extends Model
{
    protected $fillable = [
		'app_ded_code',
		'amount',
		'employee_code',
		'deduction_code'
	];

	public function deductionType() {
		return $this->belongsTo(DeductionType::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
