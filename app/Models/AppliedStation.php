<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppliedStation extends Model
{
    use HasFactory;


    protected $table = 'applied_stations';

    protected $primaryKey = 'applied_station_code';

    protected $fillable = [
        'station_code',
        'employee_code',
    ];

    public function station()
    {
        return $this->belongsTo(Station::class, 'station_code', 'station_code');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_code', 'employee_code');
    }


}
