<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tmsUserCar extends Model
{
    use SoftDeletes;
    protected $table = 'tms_user_cars';

    protected $fillable = [
        'car_id' ,
        'user_id' ,
        'preferred' ,
        'is_active'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
