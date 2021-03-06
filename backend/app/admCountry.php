<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admCountry extends Model
{
    use SoftDeletes;

    //Model Country
    protected $table = 'adm_countries';
    protected $fillable = [
        'country_name' ,
        'country_code' ,
        'country_domain'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
