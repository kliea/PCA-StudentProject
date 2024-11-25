<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgencyShare extends Model
{
	protected $fillable = [
		'agency_share_code',
		'agency_share_name',
		'shorthand',
		'amount',
		'is_mandatory',
		'remittance_percent',
		'ceiling_amount'
	];

	public function appliedShare() {
		return $this->hasMany(AppliedShare::class);
	}
}
