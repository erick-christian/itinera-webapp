<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tmsZone extends Model
{
    use SoftDeletes;
    protected $table = 'tms_zones';

    protected $fillable = [
        'sector_id' ,
        'zone_id' ,
        'zone_name'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
