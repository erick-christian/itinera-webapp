<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tmsCar extends Model
{
    use SoftDeletes;
    protected $table = 'tms_cars';

    protected $fillable = [
        'car_id' ,
        'car_description' ,
        'maker' ,
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
