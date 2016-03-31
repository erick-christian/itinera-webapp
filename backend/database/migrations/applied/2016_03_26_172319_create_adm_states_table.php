<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adm_states' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->char('country_code');
            $table->char('state_code');
            $table->char('state_name');
            $table->char('capital');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->index('country_code' , 'state_code');
            $table->index('state_code');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('adm_states');
    }
}
