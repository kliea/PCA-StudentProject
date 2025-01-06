<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
	protected $table = 'appointments';
	protected $primaryKey = 'appointment_code';

	protected $fillable = [
		'compensation_code',
		'type',
		'has_mandatory_deduction',
		'basic_pay_type'
	];

	public function employee() {
		return $this->hasMany(Employee::class);
	}
}
