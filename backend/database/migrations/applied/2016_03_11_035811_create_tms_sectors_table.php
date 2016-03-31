<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTmsSectorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('tms_sectors')) {
            Schema::drop('tms_sectors');
        }

        Schema::create('tms_sectors' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('sector_id');
            $table->string('sector_name');
            $table->string('sector_state');
            $table->string('sector_country');
            $table->char('is_active');
            $table->date('inactive_date');
            $table->float('longitude');
            $table->float('latitude');
            $table->string('geocode_url');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique(['sector_id']);
            $table->index(['sector_name']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tms_sectors');
    }
}
