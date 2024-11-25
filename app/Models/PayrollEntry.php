<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollEntry extends Model
{
    protected $fillable = [
		'current_position',
		'employee_code',
		'payroll_sheet_code'
	];

	public function payrollSheet() {
		return $this->belongsTo(PayrollSheet::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
