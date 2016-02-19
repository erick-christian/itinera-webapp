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
            $table->string('address'); /* Direcci�n */
            $table->string('neighborhood'); /* Colonia */
            $table->string('district'); /* Delegaci�n o Municipio */
            $table->string('state_id'); /* Id Estado */
            $table->string('country_id'); /* Id Pais */
            $table->string('zip_code'); /* CP */
            $table->string('gender');
            $table->string('telephone_desk');
            $table->string('telephone_mobile');
            $table->date('birth_date');
            $table->date('register_date');
            $table->integer('profile_id');
            $table->string('photo_url');
            $table->boolean('active');
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->rememberToken();
            $table->timestamps();

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->index('username');
            $table->index('profile_id');
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

