<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTmsCarMakersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tms_car_makers' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->string('carmaker_code');
            $table->string('carmaker_name');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->index('carmaker_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tms_car_makers');
    }
}
