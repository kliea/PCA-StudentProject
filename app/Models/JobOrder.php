<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOrder extends Model
{
	protected $fillable = [
		'job_order_code',
		'start_date',
		'end_date',
		'employee_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
