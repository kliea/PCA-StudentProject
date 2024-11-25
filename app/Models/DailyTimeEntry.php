<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyTimeEntry extends Model
{
	protected $fillable = [
		'dtr_entry_code',
		'date',
		'time_in_am',
		'time_ouu_am',
		'time_in_pm',
		'time_out_pm',
		'tardy_minutes',
		'undertime_minutes',
		'work_minutes',
		'dtr_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
