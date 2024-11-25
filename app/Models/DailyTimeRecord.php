<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyTimeRecord extends Model
{
	protected $fillable = [
		'dtr_code',
		'start_date',
		'end_date',
		'total_tardy_minutes',
		'total_undertime_minutes',
		'total_work_minutes',
		'employee_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}

	public function DTREntry() {
		return $this->belongsTo(DTREntry::class);
	}
}
