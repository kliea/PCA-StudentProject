<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanType extends Model
{
	protected $fillable = [
		'loan_name'
	];

	public function appliedLoan() {
		return $this->hasMany(AppliedLoan::class);
	}
}
