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

            $table->string('sector_code');
            $table->string('sector_name');
            $table->string('country_code');
            $table->string('state_code');
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
            $table->unique(['sector_code'] , 'idxSectorCode');
            $table->index(['sector_name'] , 'idxSectorName');

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
