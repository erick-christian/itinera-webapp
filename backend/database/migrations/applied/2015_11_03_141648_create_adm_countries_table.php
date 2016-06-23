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
            $table->string('country_code');
            $table->string('country_name');
            $table->string('country_domain');

            $table->timestamps();
            
            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique(['country_code'] , 'idxCountry');
            $table->index(['country_name'] , 'idxCountryName');

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

