<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admProfile extends Model
{
    use SoftDeletes;

    protected $table = 'adm_profiles';

    protected $fillable = [
        'profile_code' ,
        'profile_description' ,
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
