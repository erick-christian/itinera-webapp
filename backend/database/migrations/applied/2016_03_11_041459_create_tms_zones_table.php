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

            $table->string('sector_code');
            $table->string('zone_code');
            $table->string('zone_name');

            $table->date('inactive_date');
            $table->char('is_active' , 3);

            $table->timestamps();

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique(['sector_code' , 'zone_code'] ,
                'idxSectorZone');
            $table->index(['zone_code'] ,
                'idxZoneCode');

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
