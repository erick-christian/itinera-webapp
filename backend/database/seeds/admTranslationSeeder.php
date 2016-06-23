<?php

use Crockett\CsvSeeder\CsvSeeder;

class admTranslationSeeder extends CsvSeeder
{
    public function __construct()
    {
        $this->console_logs = true;
        $this->write_logs = true;
        $this->filename = base_path('database/seeds/csvfiles/csvAdmTranslations.csv');
        $this->table = 'adm_translations';
    }

    public function run()
    {
        DB::table('adm_translations')->delete();
        parent::run();
    }
}