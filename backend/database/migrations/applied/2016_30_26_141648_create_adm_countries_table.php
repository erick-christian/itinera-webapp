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
        Schema::create('adm_countries', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->char('country_code');
            $table->char('country_name');
            $table->char('country_domain');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique('id');
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

