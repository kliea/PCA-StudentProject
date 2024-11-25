<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Biometric extends Model
{
    protected $fillable = [
		'biometric_code',
		'device_bio_id',
		'employee_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
