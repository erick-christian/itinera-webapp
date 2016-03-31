<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class admUser extends Model implements AuthenticatableContract,
    AuthorizableContract ,
    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword, SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'adm_users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'name',
        'last_name',
        'address',
        'neighborhood',
        'district',
        'location' ,
        'region' ,
        'city' ,
        'state_code' ,
        'country_code' ,
        'zip_code',
        'gender',
        'telephone_desk',
        'telephone_mobile',
        'birth_date' ,
        'register_date',
        'profile_code' ,
        'photo_url',
        'active',
        'email',
        'password' ,
        'latitude' ,
        'longitude' ,
        'geocode_url'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /* Enable Soft Deleted */
    protected $dates = ['deleted_at'];
}
