<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admCompany extends Model
{
    use SoftDeletes;

    protected $table = 'adm_companies';
    protected $fillable = [
        'company_code' ,
        'commercial_name' ,
        'business_name' ,
        'tax_id' ,
        'address' ,
        'location' ,
        'region' ,
        'city' ,
        'state_code' ,
        'country_code' ,
        'zip_code' ,
        'phone' ,
        'contact_name' ,
        'contact_phone' ,
        'email' ,
        'website' ,
        'logo_image' ,
        'is_active'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
