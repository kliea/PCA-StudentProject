<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgencyShare extends Model
{

	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'agency_shares';

	/**
	 * The primary key associated with the table.
	 *
	 * @var string
	 */
	protected $primaryKey = 'agency_share_code';


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
