<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Table Creation
        //Schema::drop('adm_translations');
        Schema::create('adm_translations' , function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->char('interface');
            $table->char('widget');
            $table->char('literal');       /* Literal Base to Translate in English */
            $table->char('translation01'); /* Spanish    */
            $table->char('empty01');
            $table->char('tooltip01');
            $table->char('translation02'); /* English    */
            $table->char('empty02');
            $table->char('tooltip02');
            $table->char('translation03'); /* Portuguese */
            $table->char('empty03');
            $table->char('tooltip03');
            $table->char('translation04'); /* French     */
            $table->char('empty04');
            $table->char('tooltip04');
            $table->char('translation05'); /* Other       */
            $table->char('empty05');
            $table->char('tooltip05');

            /* Enable Soft Delete*/
            $table->softDeletes();

            /* Indexes */
            $table->unique('id');
            $table->unique(['interface' , 'widget']);
            $table->index(['interface']);
            $table->index('literal');
            $table->index('translation01');
            $table->index('translation02');
            $table->index('translation03');
            $table->index('translation04');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Delete Tables
        Schema::drop('adm_translations');
    }
}
