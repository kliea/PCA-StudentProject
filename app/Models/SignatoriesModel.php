<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SignatoriesModel extends Model
{   
    
	protected $table = 'signatories';
	protected $primaryKey = 'signatory_code';

	protected $fillable = [
        'signatory_template',
        'signatory_A',
        'signatory_B',
        'signatory_C',
        'signatory_D',
	];

    use HasFactory;
}
