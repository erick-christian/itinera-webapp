<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admSystem extends Model
{
    use SoftDeletes;

    protected $table = 'adm_systems';
    protected $fillable = [
        'system_code' ,
        'system_name' ,
        'version' ,
        'email_admin' ,
        'is_active'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
