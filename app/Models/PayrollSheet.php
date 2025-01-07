<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollSheet extends Model
{
	protected $table = 'payroll_sheets';
	protected $primaryKey = 'payroll_sheet_code';

	protected $fillable = [
		'payroll_sheet_code',
		'signatory_code',
		'name',
		'type',
		'start_date',
		'end_date',
		'create_date',
		'post_date',
		'pay_date',
	];
	public function payrollEntry() {
		return $this->hasMany(PayrollEntry::class);
	}
}
