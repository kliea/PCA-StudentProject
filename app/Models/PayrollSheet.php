<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollSheet extends Model
{
	protected $fillable = [
		'payroll_name',
		'payroll_type',
		'start_date',
		'end_date',
		'date_created',
		'date_posted',
		'date_paid',
		'prepared_by',
		'recommended_by',
		'certified_by',
		'approved_by'
	];
	public function payrollEntry() {
		return $this->hasMany(PayrollEntry::class);
	}
}
