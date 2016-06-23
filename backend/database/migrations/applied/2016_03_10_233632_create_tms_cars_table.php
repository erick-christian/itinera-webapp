<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTmsCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (Schema::hasTable('tms_cars')) {
            Schema::drop('tms_cars');
        }

        Schema::create('tms_cars' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->char('carmaker_code');
            $table->char('car_code');
            $table->string('car_description');
            $table->string('type');
            $table->string('cly');
            $table->string('model');
            $table->string('event');
            $table->char('is_active' , 2);
            $table->dateTime('event_date');
            $table->dateTime('inactive_date');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->index(['carmaker_code' , 'car_code']);
            $table->index(['event_date']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tms_cars');
    }
}
