<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Table Countries
        Schema::create('adm_countries' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('country_code');
            $table->string('country_name');
            $table->string('country_domain');
            $table->string('is_active' , 3);

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique('country_code');
            $table->index('country_name');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Delete Table
        Schema::drop('adm_countries');
    }
}

