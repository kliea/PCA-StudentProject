<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeductionType extends Model
{
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'deduction_code';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'deduction_types';

	protected $fillable = [
		'deduction_name',
		'shorthand',
		'amount',
		'is_mandatory',
		'remittance_percent',
		'ceiling_amount'
	];

	public function appliedDeduction() {
		return $this->hasMany(AppliedDeduction::class);
	}
}
