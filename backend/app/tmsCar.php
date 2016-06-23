<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tmsCar extends Model
{
    use SoftDeletes;
    protected $table = 'tms_cars';

    protected $fillable = [
        'carmaker_code' ,
        'car_code' ,
        'car_description' ,
        'type' ,
        'cly' ,
        'model' ,
        'event' ,
        'event_date' ,
        'is_active' ,
        'inactive_date'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
