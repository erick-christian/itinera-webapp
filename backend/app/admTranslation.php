<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admTranslation extends Model
{
    use SoftDeletes;

    protected $table = 'adm_translations';
    protected $fillable = [
        'interface',
        'widget',
        'literal',
        'translation01',
        'empty01',
        'tooltip01',
        'translation02',
        'empty02',
        'tooltip02',
        'translation03',
        'empty03',
        'tooltip03',
        'translation04',
        'empty04',
        'tooltip04',
        'translation05',
        'empty05',
        'tooltip05'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
