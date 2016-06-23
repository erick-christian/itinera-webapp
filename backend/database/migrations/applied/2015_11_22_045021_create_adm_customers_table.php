<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('adm_customers')) {
            Schema::drop('adm_customers');
        }

        Schema::create('adm_customers' , function (Blueprint $table) {
            $table->increments('id');

            $table->string('short_name');
            $table->string('company');
            $table->char('password' , 60);
            $table->string('tax_id');
            $table->string('address');
            $table->string('country_code');
            $table->string('estate_code');
            $table->string('city');
            $table->string('region');
            $table->string('location');
            $table->string('zip_code');
            $table->string('phone');
            $table->string('contact_name');
            $table->string('contact_phone');
            $table->string('contact_email');
            $table->string('website');

            $table->string('stand_taxi_code');
            $table->string('sector_code');

            $table->string('latitude');
            $table->string('longitude');
            $table->string('geocode_url');

            $table->date('inactive_date');
            $table->char('is_active' , 3);

            /* Enable Timestamps */
            $table->timestamps();

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique(['short_name'] , 'idxShortName');
            $table->index(['company'] , 'idxCompany');
            $table->index(['tax_id'] , 'idxTaxId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('adm_customers');
    }
}


