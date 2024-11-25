<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = [
		'start_date',
		'end_date',
		'employee_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
