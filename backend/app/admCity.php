<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admCity extends Model
{
    use SoftDeletes;

    protected $table = 'adm_cities';
    protected $fillable = [
        'country_code' ,
        'state_code' ,
        'city_code' ,
        'city_name'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
