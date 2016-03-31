<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adm_users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username');
            $table->string('name');
            $table->string('last_name');
            $table->string('address');
            $table->string('neighborhood');
            $table->string('district');
            $table->string('location');
            $table->string('region');
            $table->string('city');
            $table->string('state_code');
            $table->string('country_code');
            $table->string('zip_code');
            $table->string('gender');
            $table->string('civil_status');
            $table->string('telephone_desk');
            $table->string('telephone_mobile');
            $table->date('birth_date');
            $table->date('register_date');
            $table->string('profile_code');
            $table->string('photo_url');
            $table->string('active' , 8);
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->string('latitude');
            $table->string('longitude');
            $table->string('geocode_url');            
            $table->rememberToken();
            $table->timestamps();

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->index('email');
            $table->index('username');
            $table->index('profile_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('adm_users');
    }
}

