<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admLanguage extends Model
{
    use SoftDeletes;

    //Model Language
    protected $table = 'adm_languages';
    protected $fillable = ['name'];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
