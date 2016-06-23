<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admCustomer extends Model
{
    use SoftDeletes;

    protected $table = 'adm_customers';
    protected $fillable = [
        'short_name' ,
        'password' ,
        'company' ,
        'tax_id' ,
        'address' ,
        'country_code' ,
        'estate_code' ,
        'location' ,
        'region' ,
        'city' ,
        'zip_code' ,
        'phone' ,
        'contact_name' ,
        'contact_phone' ,
        'email' ,
        'website' ,
        'active' ,
        'latitude' ,
        'longitude' ,
        'geocode_url'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
