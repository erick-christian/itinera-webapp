<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTmsZonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (Schema::hasTable('tms_zones')) {
            Schema::drop('tms_zones');
        }

        Schema::create('tms_zones' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('sector_id');
            $table->integer('zone_id');
            $table->string('zone_name');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique(['sector_id' , 'zone_id']);
            $table->index(['zone_id']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tms_zones');
    }
}
