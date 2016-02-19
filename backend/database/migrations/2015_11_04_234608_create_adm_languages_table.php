<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmLanguagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Table Creation

        if (Schema::hasTable('adm_languages')) {
            Schema::drop('adm_languages');
        }

        Schema::create('adm_languages', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->char('name');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Delete Table
        Schema::drop('adm_languages');
    }
}
