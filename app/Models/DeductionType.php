<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeductionType extends Model
{
	protected $table = 'deduction_types';
	protected $primaryKey = 'deduction_code';

	protected $fillable = [
		'name',
		'shorthand',
		'is_mandatory',
		'compensation_link',
		'fixed_amount',
		'remittance_percent',
		'ceiling_amount',
	];


	public function appliedDeduction()
	{
		return $this->hasMany(AppliedDeduction::class);
	}
}
