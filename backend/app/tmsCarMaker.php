<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tmsCarMaker extends Model
{
    use SoftDeletes;
    protected $table = 'tms_car_makers';

    protected $fillable = [
        'carmaker_code' ,
        'carmaker_name' ,
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
