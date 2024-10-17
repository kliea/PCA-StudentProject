<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SSLModel extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'salary_standard_law';

    protected $fillable = ['salary_grade', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8',];
}
