<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
	protected $fillable = [
		'appointment_type',
		'has_mandatory_deduction',
		'basic_pay_type',
		'tax_type'
	];

	public function employee() {
		return $this->hasMany(Employee::class);
	}
}
