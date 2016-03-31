<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTmsEventCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (Schema::hasTable('tms_event_cars')) {
            Schema::drop('tms_event_cars');
        }

        Schema::create('tms_event_cars' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('car_id');
            $table->string('event');
            $table->date('event_date');
            $table->string('actions');
            $table->date('action_end_date');
            $table->char('is_active');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->index(['car_id' , 'event']);
            $table->index(['car_id']);
            $table->index(['event']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tms_event_cars');
    }
}
