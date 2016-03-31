<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tmsSector extends Model
{

    use SoftDeletes;
    protected $table = 'tms_sectors';

    protected $fillable = [
        'sector_id' ,
        'sector_name' ,
        'sector_state' ,
        'sector_country' ,
        'is_active' ,
        'inactive_date' ,
        'longitude' ,
        'latitude' ,
        'geocode_url'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];

}
