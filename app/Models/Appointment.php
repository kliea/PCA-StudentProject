<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'appointment_code';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'appointments';

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
