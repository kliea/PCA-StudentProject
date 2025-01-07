<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedCompensation extends Model
{
	protected $table = 'applied_compensations';
	protected $primaryKey = 'applied_compensation_code';

    protected $fillable = [
		'employee_code',
		'compensation_code',
		'payroll_sheet_code',
		'amount',
	];

	public function compensationType() {
		return $this->belongsTo(CompensationType::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
