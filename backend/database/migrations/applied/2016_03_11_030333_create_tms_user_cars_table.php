<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTmsUserCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (Schema::hasTable('tms_user_cars')) {
            Schema::drop('tms_user_cars');
        }

        Schema::create('tms_user_cars' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('car_id');
            $table->integer('user_id');
            $table->char('preferred');
            $table->char('is_active');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique(['car_id' , 'user_id']);
            $table->index(['car_id']);
            $table->index(['user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tms_user_cars');
    }
}
