<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tmsEventCar extends Model
{

    use SoftDeletes;
    protected $table = 'tms_event_cars';

    protected $fillable = [
        'car_id' ,
        'event' ,
        'event_date' ,
        'actions' ,
        'actions_end_date' ,
        'is_active'
    ];
    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
