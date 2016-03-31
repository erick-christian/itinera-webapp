<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('adm_companies')) {
            Schema::drop('adm_companies');
        }

        Schema::create('adm_companies' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->char('company_code');
            $table->char('commercial_name');
            $table->char('business_name');
            $table->char('tax_id');
            $table->char('address');
            $table->char('location');
            $table->char('region');
            $table->char('city');
            $table->char('state_code');
            $table->char('country_code');
            $table->char('zip_code');
            $table->char('phone');
            $table->char('contact_name');
            $table->char('contact_phone');
            $table->char('email');
            $table->char('website');
            $table->char('logo_image');
            $table->char('active');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->index(['company_code']);


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('adm_companies');
    }
}
