<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admRegion extends Model
{
    use SoftDeletes;

    protected $table = 'adm_regions';
    protected $fillable = [
        'country_code' ,
        'state_code' ,
        'city_code' ,
        'region_code' ,
        'region_name' ,
        'latitude' ,
        'longitude' ,
        'altitude'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
