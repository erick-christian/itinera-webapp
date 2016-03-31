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

        Schema::create('adm_customers', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->char('short_name');
            $table->string('password', 60);
            $table->char('company');
            $table->char('tax_id');
            $table->char('address');
            $table->char('country_code');
            $table->char('estate_code');
            $table->char('location');
            $table->char('region');
            $table->char('city');
            $table->char('zip_code');
            $table->char('phone');
            $table->char('contact_name');
            $table->char('contact_phone');
            $table->char('email');
            $table->char('website');
            $table->char('active');
            $table->char('latitude');
            $table->char('longitude');
            $table->char('geocode_url');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->index(['company']);
            $table->index(['tax_id']);
            $table->index(['short_name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('adm_languages');
    }
}


