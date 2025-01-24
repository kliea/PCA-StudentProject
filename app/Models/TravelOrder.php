<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelOrder extends Model
{
	protected $table = 'travel_orders';
	protected $primaryKey = 'travel_order_code';

	protected $fillable = [
		'type',
		'description',
		'start_date',
		'end_date',
		'file_date',
		'is_approved',
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
