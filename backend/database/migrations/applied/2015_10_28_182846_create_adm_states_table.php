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
            $table->integer('country_id');
            $table->char('state_code');
            $table->char('state_name');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique('id');
            $table->index(['country_id' , 'state_code']);
            $table->index('state_name');
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
