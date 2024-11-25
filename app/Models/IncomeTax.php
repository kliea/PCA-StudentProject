<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncomeTax extends Model
{
	protected $fillable = [
		'lowerbound',
		'upperbound',
		'base_amount',
		'tax_rate'
	];
}
