<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgencyShare extends Model
{
	protected $table = 'agency_shares';
	protected $primaryKey = 'agency_share_code';

	protected $fillable = [
		'name',
		'shorthand',
		'amount',
		'is_mandatory',
		'compensation_link',
		'fixed_amount',
		'remittance_percent',
		'ceiling_amount',
	];
	public function appliedShare()
	{
		return $this->hasMany(AppliedShare::class);
	}
}
