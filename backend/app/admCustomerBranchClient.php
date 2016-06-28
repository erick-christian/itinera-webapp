<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class admCustomerBranchClient extends Model
{
    use SoftDeletes;

    protected $table = 'adm_customer_branch_clients';
    protected $fillable = [
        'customer_code' ,
        'client_code' ,
        'short_name' ,
        'password' ,
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
        'active' ,
        'latitude' ,
        'longitude' ,
        'geocode_url'
    ];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];

}
