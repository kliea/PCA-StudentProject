<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedCompensation extends Model
{
    protected $fillable = [
		'app_comp_code',
		'amount',
		'employee_code',
		'compensation_code'
	];

	public function compensationType() {
		return $this->belongsTo(CompensationType::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
