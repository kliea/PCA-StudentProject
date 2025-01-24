<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedShare extends Model
{
	protected $table = 'applied_shares';
	protected $primaryKey = 'applied_share_code';

    protected $fillable = [
		'amount',
		'employee_code',
		'agency_share_code',
		'payroll_sheet_code',
	];

	public function agencyShare() {
		return $this->belongsTo(AgencyShare::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
