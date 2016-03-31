<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admState extends Model
{
    use SoftDeletes;

    protected $table = 'adm_states';
    protected $fillable = [
        'country_code',
        'state_code',
        'state_name',
        'capital'
        ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
